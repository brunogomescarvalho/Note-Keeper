import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { Nota } from '../notas-model/nota';
import { take } from 'rxjs';

@Component({
  selector: 'app-notas-home',
  templateUrl: './notas-home.component.html',
  styleUrls: ['./notas-home.component.css']
})
export class NotasHomeComponent implements OnInit {

  notas: Nota[] = []

  constructor(private serviceHttp: HttpService) { }

  ngOnInit(): void {
    this.obterListaNotas();
  }

  private obterListaNotas() {
    this.serviceHttp.selecionarTodos()
    .pipe(take(1))
       .subscribe((dados) => {
        this.notas = dados.filter((x: Nota) =>
             x.arquivado === false);
      });
  }
}
