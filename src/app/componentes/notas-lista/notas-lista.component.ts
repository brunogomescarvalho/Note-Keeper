import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';

@Component({
  selector: 'app-notas-lista',
  templateUrl: './notas-lista.component.html',
  styleUrls: ['./notas-lista.component.css']
})
export class NotasListaComponent implements OnInit {

  @Input() notas!: Nota[];

  constructor(private eventService: ComunicacaoService) { }

  ngOnInit(): void {
    this.notas = [];
    this.registrarEventos();
 
  }

  private registrarEventos() {
    this.eventService.eventSalvarNotas()
      .subscribe((nota: Nota) => {
        this.notas.push(nota);

      });

    this.eventService.eventExcluirNotas().subscribe((id: number) => {
      let index = this.notas.findIndex(x => id == x.id);
         this.notas.splice(index, 1);
    });
  }

}


