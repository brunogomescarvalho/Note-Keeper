import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { Categoria } from 'src/app/models/categoria';
import { Observable, first } from 'rxjs';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notas-lista',
  templateUrl: './notas-lista.component.html',
  styleUrls: ['./notas-lista.component.css']
})
export class NotasListaComponent implements OnInit {

  @Input() notas!: Nota[];

  @Input() categorias!: Categoria[];

  @Input() buscarArquivados = false;

  cardAberto?: number | null;

  constructor(
    private serviceCategoria: CategoriaHttpService,
    private serviceNota: NotasHttpService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.notas = [];
    this.obterCategorias()
  }

  public eventMostrarCores(index: number) {
    this.cardAberto = this.cardAberto === index ? null : index
  }

  public eventoReceberCategoria(categoria: Categoria) {
    let observable = new Observable<Nota[]>();

    if (categoria)
      observable = this.serviceNota.filtrarPorCategoria(categoria.id!, this.buscarArquivados)
    else
      observable = this.serviceNota.selecionarTodos(this.buscarArquivados)

    observable
      .pipe(
        first()
      )
      .subscribe((notas: Nota[]) => {
        if (notas.length === 0)
          this.toast.info('Nenhuma nota cadastrada até o momento!')
        this.notas = notas
      })
  }

  public excluirNota(nota: Nota) {
    this.serviceNota.excluirNota(Number(nota.id))
      .pipe(
        first()
      )
      .subscribe(() => {
        let index = this.notas.findIndex(x => nota.id == x.id);
        this.notas.splice(index, 1);
        this.toast.success("Nota excluída", "Sucesso")
      })

  }

  private obterCategorias() {
    this.serviceCategoria.selecionarTodos()
      .pipe(
        first()
      )
      .subscribe((dados: Categoria[]) => {
        this.categorias = dados
      })
  }

  public arquivarClicado(nota: Nota) {
    nota.arquivado = !nota.arquivado
    this.serviceNota.arquivarNota(nota)
      .pipe(
        first()
      )
      .subscribe((dado: Nota) => {
        let index = this.notas.findIndex(x => dado.id == x.id);
        this.notas.splice(index, 1);
        this.toast.success(`Nota ${nota.arquivado ? 'arquivada' : 'desarquivada'}`);
      });
  }

  public editarCorCard(nota: Nota) {
    this.serviceNota.editarNota(nota)
      .pipe(
        first()
      )
      .subscribe();
  }

}

