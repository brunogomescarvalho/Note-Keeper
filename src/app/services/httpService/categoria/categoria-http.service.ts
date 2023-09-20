import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaHttpService {

  private url =  `${environment.API_URL}/api/categoria`;

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
