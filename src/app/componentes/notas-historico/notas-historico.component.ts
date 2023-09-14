import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../notas-model/nota';
import { HttpService } from 'src/app/services/httpService/http.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-notas-historico',
  templateUrl: './notas-historico.component.html',
  styleUrls: ['./notas-historico.component.css']
})
export class NotasHistoricoComponent implements OnInit {

  constructor(private serviceHttp: HttpService) { }

  @Input() notas!: Nota[];

  ngOnInit(): void {
    this.serviceHttp.selecionarTodos()
      .pipe(take(1))
        .subscribe((dados: Nota[]) => {
          this.notas = dados.filter(x => x.arquivado === true)
      })
  }

}
