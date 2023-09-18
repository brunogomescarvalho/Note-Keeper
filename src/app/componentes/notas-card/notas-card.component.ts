import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nota, Tema } from '../../models/nota';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent implements OnInit {

  @Output() onEnviarTema = new EventEmitter<Tema>();

  @Output() onCardClicado = new EventEmitter<void>();

  @Input() nota: Nota = {} as Nota;

  @Input() mostrarCores: boolean = false;

  @Input() cardNoFormulario: boolean = false;

  botoesDesabilitados: boolean = false;

  tema!: Tema;

  constructor(
    private servicoEvents: ComunicacaoService,
    private serviceHttp: NotasHttpService,
    private router: Router,
    private toast: ToastrService
  ) { }


  ngOnInit(): void {

    if (this.nota.arquivado) {
      this.botoesDesabilitados = true
      this.tema = 'secondary'
    }
    else {
      this.tema = this.nota.tema!
    }
  }

  public eventMostrarCores() {
    this.onCardClicado.emit();
  }

  public excluir(id: any) {
    this.serviceHttp.excluirNota(id)
      .pipe(
        first()
      )
      .subscribe(() => {
        this.servicoEvents.emitirExcluirNota(id)
        this.toast.success("Nota excluída", "Sucesso")
      })
  }

  public receberCorSelecionada = (event: Event) => {
    this.tema = event as unknown as Tema
    this.nota.tema = this.tema

    if (this.cardNoFormulario)
      this.onEnviarTema.emit(this.tema);
    else
      this.serviceHttp.editarNota(this.nota)
        .pipe(
          first()
        )
        .subscribe();
  }

  public arquivar(nota: Nota) {
    nota.arquivado = !nota.arquivado
    this.serviceHttp.arquivarNota(nota)
      .pipe(
        first()
      )
      .subscribe((dado: Nota) => {
        this.servicoEvents.emitirExcluirNota(dado.id!);
        this.toast.success(`Nota ${nota.arquivado ? 'arquivada' : 'desarquivada'}`);
      });
  }

  public editar(nota: Nota) {
    this.router.navigate(['notas/editar', nota.id])
  }

}
