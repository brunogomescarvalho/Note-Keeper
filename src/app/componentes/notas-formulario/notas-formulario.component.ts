import { Component, OnInit } from '@angular/core';
import { Nota } from '../notas-model/nota';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacaoService } from 'src/app/services/comunicacao.service';


@Component({
  selector: 'app-notas-formulario',
  templateUrl: './notas-formulario.component.html',
  styleUrls: ['./notas-formulario.component.css']
})
export class NotasFormularioComponent implements OnInit {

  formNotas!: FormGroup

  id: number = 1;

  constructor(private eventService: ComunicacaoService) {}

  ngOnInit(): void {
    this.formulario(new Nota())
  }

  formulario(nota: Nota) {
    this.formNotas = new FormGroup({
           conteudo: new FormControl(nota.conteudo, [Validators.required]),
               tema: new FormControl(nota.tema)
    })
  }

  onSubmit() {
    if (this.formNotas.valid) {
      let nota: Nota = {
         id: this.id++,
          titulo: "",
           conteudo: this.formNotas.value.conteudo,
            tema: this.formNotas.value.tema
      }
      this.formNotas.reset();
      this.eventService.emitirEvento(nota, "inserir");
    }
  }
}
