import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { Categoria } from 'src/app/models/categoria';
import { Observable, take } from 'rxjs';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';

@Component({
  selector: 'app-notas-lista',
  templateUrl: './notas-lista.component.html',
  styleUrls: ['./notas-lista.component.css']
})
export class NotasListaComponent implements OnInit {

  @Input() notas!: Nota[];

  @Input() categorias!: Categoria[];

  @Input() buscarArquivados = false;

  constructor(
    private eventService: ComunicacaoService,
    private serviceCategoria: CategoriaHttpService,
    private serviceNota: NotasHttpService) { }

  ngOnInit(): void {
    this.notas = [];
    this.registrarEventos();
    this.obterCategorias()

  }

  private obterCategorias() {
    this.serviceCategoria.selecionarTodos()
      .pipe(take(1))
      .subscribe((dados: Categoria[]) => {
        this.categorias = dados
      })
  }

  private registrarEventos() {
    this.eventoExcluirNota();
  }


  public eventoReceberCategoria(c: Categoria) {

    let observable = new Observable<Nota[]>();

    if (c)
      observable = this.serviceNota.filtrarPorCategoria(c.id!, this.buscarArquivados)
    else
      observable = this.serviceNota.selecionarTodos(this.buscarArquivados)

    observable.pipe(take(1))
      .subscribe((notas: Nota[]) => {
        this.notas = notas
      })
  }


  private eventoExcluirNota() {
    this.eventService.eventExcluirNotas().subscribe((id: number) => {
      let index = this.notas.findIndex(x => id == x.id);
      this.notas.splice(index, 1);
    });
  }

}


