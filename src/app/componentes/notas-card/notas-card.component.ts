import { Component, Input } from '@angular/core';
import { Nota } from '../notas-model/nota';
import { ComunicacaoService } from 'src/app/services/comunicacao.service';

@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent {

  @Input() nota?: Nota;

  constructor(private servicoEvents: ComunicacaoService) {}


  public excluir(id: any) {
    this.servicoEvents.emitirEvento(id, "excluir")
  }
}
