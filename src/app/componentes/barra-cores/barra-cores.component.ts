import { Component, EventEmitter, Output } from '@angular/core';
import { Tema } from '../../models/nota';

@Component({
  selector: 'app-barra-cores',
  templateUrl: './barra-cores.component.html',
  styleUrls: ['./barra-cores.component.css']
})
export class BarraCoresComponent {

  @Output() public onCorSelecionada = new EventEmitter();

  constructor() { }

  public enviarCor(cor: Tema) {
    this.onCorSelecionada.emit(cor);
  }

}
