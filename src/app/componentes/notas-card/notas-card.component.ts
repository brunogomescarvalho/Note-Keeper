import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nota, Tema } from '../../models/nota';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas-card',
  templateUrl: './notas-card.component.html',
  styleUrls: ['./notas-card.component.css']
})
export class NotasCardComponent implements OnInit {

  @Output() onEnviarTema = new EventEmitter<Tema>();

  @Output() onCardClicado = new EventEmitter<void>();

  @Output() onArquivarClicado = new EventEmitter<Nota>();

  @Output() onExcluirNota = new EventEmitter<Nota>();

  @Output() onAlterarCorCard = new EventEmitter<Nota>();

  @Input() nota: Nota = {} as Nota;

  @Input() mostrarCores: boolean = false;

  @Input() cardNoFormulario: boolean = false;

  botoesDesabilitados: boolean = false;

  tema!: Tema;

  constructor(private router: Router) { }


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

  public excluir(nota: Nota) {
    this.onExcluirNota.emit(nota)
  }

  public receberCorSelecionada = (event: Event) => {
    this.tema = event as unknown as Tema
    this.nota.tema = this.tema

    if (this.cardNoFormulario)
      this.onEnviarTema.emit(this.tema);
    else
    this.onAlterarCorCard.emit(this.nota);
  }

  public arquivar(nota: Nota) {
    this.onArquivarClicado.emit(nota)
  }

  public editar(nota: Nota) {
    this.router.navigate(['notas/editar', nota.id])
  }

}
