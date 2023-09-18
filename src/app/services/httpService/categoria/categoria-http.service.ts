import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaHttpService {

  private url: string = 'http://localhost:3000/categoria'

  constructor(private service: HttpClient) { }


  public selecionarTodos(): Observable<Categoria[]> {
    return this.service.get<Categoria[]>(this.url)
  }

  public cadastrar(categoria: Categoria): Observable<Categoria> {
    return this.service.post<Categoria>(this.url, categoria);
  }

  public buscarPorId(id: number) {
    return this.service.get<Categoria>(`${this.url}/${id}?_embed=nota`);
  }

  public excluir(id: number) {
    return this.service.delete<boolean>(`${this.url}/${id}`);
  }

  public editar(categoria: Categoria) {
    return this.service.put<Categoria>(`${this.url}/${categoria.id}`, categoria);
  }

}
