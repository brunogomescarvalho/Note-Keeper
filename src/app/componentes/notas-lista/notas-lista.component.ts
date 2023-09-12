import { Component, OnInit } from '@angular/core';
import { Nota } from '../notas-model/nota';
import { ComunicacaoService } from 'src/app/services/comunicacao.service';

@Component({
  selector: 'app-notas-lista',
  templateUrl: './notas-lista.component.html',
  styleUrls: ['./notas-lista.component.css']
})
export class NotasListaComponent implements OnInit {

  notas: Nota[] = []

  constructor(private eventService: ComunicacaoService) { }

  ngOnInit(): void {
    this.eventService.receberEvento().subscribe((evento: any) => {

      switch (evento.acao) {
        case "inserir":
          this.notas.push(evento.obj)
          break;

        default:
          let index = this.notas.findIndex(x => evento.obj == x.id);
          this.notas.splice(index, 1);
          break;
      }

    })

  }
}

