import { Component, OnInit } from '@angular/core';
import { Nota } from '../../models/nota';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacaoService } from 'src/app/services/eventosService/comunicacao.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { take } from 'rxjs';
import {ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-notas-formulario',
  templateUrl: './notas-formulario.component.html',
  styleUrls: ['./notas-formulario.component.css']
})
export class NotasFormularioComponent implements OnInit {

  formNotas!: FormGroup

  nota: Nota;

  constructor(
    private eventService: ComunicacaoService, 
    private httpService: NotasHttpService, 
    private toast:ToastrService) {
    this.nota = new Nota();
  }

  ngOnInit(): void {
    this.formulario(this.nota);

  }

  formulario(nota: Nota) {
    this.formNotas = new FormGroup({
           conteudo: new FormControl(nota.conteudo, [Validators.required]),
               tema: new FormControl(nota.tema)
    })
  }

  onSubmit() {
    if (this.formNotas.valid) {
     
      this.nota.tema = this.formNotas.value.tema;
      this.nota.titulo =""
      this.nota.conteudo = this.formNotas.value.conteudo;
      this.nota.arquivado = false
      this.nota.categoriaId = 0;

      this.formNotas.reset();
      this.cadastrarNota(this.nota);

    }

  }

  private cadastrarNota(nota: Nota) {
    this.httpService.criarNota(nota)
      .pipe(take(1))
        .subscribe((dados: Nota) => {
         this.eventService.
            emitirSalvarNota(dados);
              this.toast.success("Nota cadastrada com sucesso!","Sucesso");
      });
  }
}

