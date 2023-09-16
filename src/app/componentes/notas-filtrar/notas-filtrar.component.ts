import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-notas-filtrar',
  templateUrl: './notas-filtrar.component.html',
  styleUrls: ['./notas-filtrar.component.css']
})
export class NotasFiltrarComponent {

  @Input() categorias!: Categoria[]

  @Output() onEnviarCategoria = new EventEmitter<Categoria>();

  enviarCategoria(c: Categoria) {
    this.onEnviarCategoria.emit(c)
  }

  buscarTodos() {
    this.onEnviarCategoria.emit()
  }

}
