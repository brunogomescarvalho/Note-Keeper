import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notas-historico',
  templateUrl: './notas-historico.component.html',
  styleUrls: ['./notas-historico.component.css']
})
export class NotasHistoricoComponent implements OnInit {

  constructor(private serviceHttp: NotasHttpService, private toast: ToastrService) { }

  @Input() notas!: Nota[];

  ngOnInit(): void {
    this.serviceHttp.selecionarTodos(true)
      .pipe(
        first()
      )
      .subscribe((dados: Nota[]) => {
        if (dados.length == 0)
          this.toast.info('Nenhuma nota arquivada até o momento', 'Lista Vazia')
        this.notas = dados
      })
  }
}
