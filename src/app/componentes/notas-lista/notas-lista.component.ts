import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
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
    private eventService: ComunicacaoService,
    private serviceCategoria: CategoriaHttpService,
    private serviceNota: NotasHttpService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.notas = [];
    this.eventoExcluirNota();
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

  private eventoExcluirNota() {
    this.eventService.eventExcluirNotas()
      .subscribe((id: number) => {
        let index = this.notas.findIndex(x => id == x.id);
        this.notas.splice(index, 1);
      });
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

}

