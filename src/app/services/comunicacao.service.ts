import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {

  private evento = new Subject<any>();

  emitirEvento(obj: any, acao: string) {
    const evento = { obj, acao }
    this.evento.next(evento);
  }

  receberEvento() {
    return this.evento.asObservable();
  }
}

