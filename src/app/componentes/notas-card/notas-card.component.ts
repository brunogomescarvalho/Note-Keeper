import { Component, Input, Output } from '@angular/core';
import { Nota, Tema } from '../notas-model/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';

@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent {

  @Input() nota?: Nota;

  mostrar: boolean = false;

  constructor(private servicoEvents: ComunicacaoService) { }


  public excluir(id: any) {
    this.servicoEvents.emitirExcluirNota(id)
  }

  public mostrarCores() {
    this.mostrar = !this.mostrar

  }

  public receberCorSelecionada = (event: Event) => {
    let tema = event as unknown
    this.nota!.tema = tema as Tema
  }

}
