import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-notas-historico',
  templateUrl: './notas-historico.component.html',
  styleUrls: ['./notas-historico.component.css']
})
export class NotasHistoricoComponent implements OnInit {

  constructor(private serviceHttp: NotasHttpService) { }

  @Input() notas!: Nota[];

  ngOnInit(): void {
    this.serviceHttp.selecionarTodos(true)
      .pipe(take(1))
      .subscribe((dados: Nota[]) => {
        this.notas = dados
      })
  }

}
