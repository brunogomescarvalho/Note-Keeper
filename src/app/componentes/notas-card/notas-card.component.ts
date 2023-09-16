import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nota, Tema } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent implements OnInit {

  @Input() nota: Nota = {} as Nota;

  @Input() categoria: Categoria = {} as Categoria;

  @Input() mostrarCores: boolean = false;

  @Input() mostrarButtons: boolean = true;

  @Output() onEnviarTema = new EventEmitter();

  @Input() tema!: Tema;

  btnDesabilitado: boolean = false;

  constructor(
    private servicoEvents: ComunicacaoService,
    private serviceHttp: NotasHttpService,
    private serviceHttpCategoria: CategoriaHttpService,
    private router: Router,
    private toast: ToastrService
  ) { }


  ngOnInit(): void {

    if (this.nota.categoriaId)
      this.obterCategoria();

    if (this.nota.arquivado) {
      this.btnDesabilitado = true
      this.tema = 'secondary'
    }
    else {
      this.tema = this.nota.tema!
    }
  }

  private obterCategoria() {
    this.serviceHttpCategoria.buscarPorId(this.nota.categoriaId!)
      .pipe(take(1)).subscribe((dados: Categoria) => {
        this.categoria = dados;
      });
  }

  public excluir(id: any) {
    this.serviceHttp.excluirNota(id)
      .pipe(take(1)).subscribe(() => {
        this.servicoEvents.emitirExcluirNota(id)
      })
  }

  public mostrarQuadroCores() {
    this.mostrarCores = !this.mostrarCores;
  }


  public receberCorSelecionada = (event: Event) => {

    this.tema = event as unknown as Tema
    this.nota.tema = this.tema

    if (this.mostrarButtons)
      this.serviceHttp.editarNota(this.nota).pipe(take(1)).subscribe();
    else
      this.onEnviarTema.emit(this.tema);

  }

  public arquivar(nota: Nota) {
    nota.arquivado = !nota.arquivado
    this.serviceHttp.arquivarNota(nota)
      .pipe(take(1)).subscribe((dado: Nota) => {
        this.servicoEvents.emitirExcluirNota(dado.id!);
        this.toast.success(`Nota ${nota.arquivado ? 'arquivada' : 'desarquivada'}`);
      });
  }

  public editar(nota: Nota) {
    this.router.navigate(['notas/editar', nota.id])
  }

}
