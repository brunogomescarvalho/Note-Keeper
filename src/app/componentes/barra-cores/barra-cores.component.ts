import { Component, EventEmitter, Output } from '@angular/core';
import { Tema } from '../notas-model/nota';

@Component({
  selector: 'app-barra-cores',
  templateUrl: './barra-cores.component.html',
  styleUrls: ['./barra-cores.component.css']
})
export class BarraCoresComponent {

  @Output() public corSelecionada = new EventEmitter();

  constructor() { }

  public enviarCor(cor: Tema) {
    this.corSelecionada.emit(cor);
  }

}
