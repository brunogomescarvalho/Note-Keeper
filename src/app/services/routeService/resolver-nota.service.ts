import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveData } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Nota } from 'src/app/models/nota';
import { NotasHttpService } from '../httpService/notas/notas-http.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverNota implements ResolveData {

  constructor(private service: NotasHttpService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Nota> {

    if (route.params && route.params['id'])
      return this.service.selecionarPorId(Number(route.paramMap.get('id')));

    return of(new Nota())

  }

}
