import { Component, Input, OnInit } from '@angular/core';
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

  categoria: Categoria = {} as Categoria;

  mostrar: boolean = false;

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
  }


  private obterCategoria() {
    this.serviceHttpCategoria.buscarPorId(this.nota.categoriaId!)
      .pipe(take(1))
      .subscribe((dados: Categoria) => {
        this.categoria = dados;
      });
  }

  public excluir(id: any) {
    this.serviceHttp.excluirNota(id)
      .pipe(take(1))
      .subscribe(() => {
        this.servicoEvents.emitirExcluirNota(id)
      })
  }

  public mostrarCores() {
    this.mostrar = !this.mostrar
  }

  public receberCorSelecionada = (event: Event) => {
    let tema = event as unknown
    this.nota.tema = tema as Tema
    this.serviceHttp.editarNota(this.nota)
      .pipe(take(1))
      .subscribe();
  }

  public arquivar(nota: Nota) {
    nota.arquivado = !nota.arquivado
    this.serviceHttp.arquivarNota(nota)
      .pipe(take(1))
      .subscribe((dado: Nota) => {
        this.servicoEvents.emitirExcluirNota(dado.id!);
        this.toast.success(`Nota ${nota.arquivado ? 'arquivada' : 'desarquivada'}`);
      });
  }

  public editar(nota: Nota) {
    this.router.navigate(['notas/editar', nota.id])
  }

}
