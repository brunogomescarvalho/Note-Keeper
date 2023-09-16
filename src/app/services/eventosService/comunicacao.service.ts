import { EventEmitter, Injectable } from '@angular/core';
import { Nota, Tema } from '../../models/nota';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {

  private excluirNota = new EventEmitter<number>();

  emitirExcluirNota(id: number) {
    this.excluirNota.emit(id);
  }

  eventExcluirNotas() {
    return this.excluirNota.asObservable();
  }
  
}

