import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from 'src/app/componentes/notas-model/nota';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = "http://localhost:3000/nota"

  constructor(private httpService: HttpClient) { }


  public criarNota(nota: Nota) {
    return this.httpService.post<Nota>(this.url, nota)
  }

  public editarNota(nota: Nota) {
    return this.httpService.put<Nota>(`${this.url}/${nota.id}`, nota)
  }

  public arquivarNota(nota: Nota) {
    return this.httpService.patch<Nota>(`${this.url}/${nota.id}`, nota)
  }

  public excluirNota(id: number) {
    return this.httpService.delete<Nota>(`${this.url}/${id}`)
  }

  public selecionarTodos() {
    return this.httpService.get<Nota[]>(this.url)
  }

  public selecionarPorId(id: number): Observable<Nota> {
    return this.httpService.get<Nota>(`${this.url}/${id}`)
  }
}
