import { EventEmitter, Injectable } from '@angular/core';
import { Nota, Tema } from '../../componentes/notas-model/nota';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {

  private salvarNota = new EventEmitter<Nota>();

  private excluirNota = new EventEmitter<number>();


  emitirSalvarNota(nota: Nota) {
    this.salvarNota.emit(nota);
  }

  emitirExcluirNota(id: number) {
    this.excluirNota.emit(id);
  }

  eventSalvarNotas() {
    return this.salvarNota.asObservable();
  }

  eventExcluirNotas() {
    return this.excluirNota.asObservable();
  }
  
}

