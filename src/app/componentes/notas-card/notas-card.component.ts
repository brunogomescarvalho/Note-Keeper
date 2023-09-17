import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nota, Tema } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { first } from 'rxjs';
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

  @Output() onEnviarTema = new EventEmitter<Tema>();

  @Output() onCardClicado = new EventEmitter<void>();

  @Input() tema!: Tema;

  @Input() indexAtual!: number

  @Input() nota: Nota = {} as Nota;

  @Input() mostrarCores: boolean = false;

  @Input() mostrarButtons: boolean = true;

  @Input() categoria: Categoria = {} as Categoria;

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

  public eventMostrarCores() {
    this.onCardClicado.emit();
  }

  public excluir(id: any) {
    this.serviceHttp.excluirNota(id)
      .pipe(first()).subscribe(() => {
        this.servicoEvents.emitirExcluirNota(id)
        this.toast.success("Nota excluída", "Sucesso")
      })
  }

  public receberCorSelecionada = (event: Event) => {
    this.tema = event as unknown as Tema
    this.nota.tema = this.tema

    if (this.mostrarButtons)
      this.serviceHttp.editarNota(this.nota).pipe(first()).subscribe();
    else
      this.onEnviarTema.emit(this.tema);

  }

  public arquivar(nota: Nota) {
    nota.arquivado = !nota.arquivado
    this.serviceHttp.arquivarNota(nota)
      .pipe(first()).subscribe((dado: Nota) => {
        this.servicoEvents.emitirExcluirNota(dado.id!);
        this.toast.success(`Nota ${nota.arquivado ? 'arquivada' : 'desarquivada'}`);
      });
  }

  public editar(nota: Nota) {
    this.router.navigate(['notas/editar', nota.id])
  }


  private obterCategoria() {
    this.serviceHttpCategoria.buscarPorId(this.nota.categoriaId!)
      .pipe(first()).subscribe((dados: Categoria) => {
        this.categoria = dados;
      });
  }

}
