import { Component, Input, Output } from '@angular/core';
import { Nota, Tema } from '../notas-model/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { HttpService } from 'src/app/services/httpService/http.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent {

  @Input() nota: Nota = {} as Nota;

  mostrar: boolean = false;

  constructor(private servicoEvents: ComunicacaoService, private serviceHttp: HttpService) { }


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
      .subscribe((dado: Nota) =>
      this.servicoEvents.emitirExcluirNota(dado.id!))
  }

}
