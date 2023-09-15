import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria!: Categoria;
  formulario!: FormGroup;

  constructor(
    private service: CategoriaHttpService, 
    private toast: ToastrService) {
    this.categoria = new Categoria();
  }

  ngOnInit(): void {
    this.iniciarFormulario(this.categoria);
  }

  private iniciarFormulario(categoria: Categoria) {

    this.formulario = new FormGroup({
      id: new FormControl(categoria.id),
      nome: new FormControl(categoria.nome, [Validators.required])
    });

  }

  onSubmit() {

    if (this.formulario.valid) {
      this.categoria.nome = this.formulario.value.nome;

      this.service.cadastrar(this.categoria)
        .pipe(take(1))
        .subscribe((dados: Categoria) => {
          this.formulario.reset();
          this.toast.success(`Categoria ${dados.nome} cadastrada com sucesso`, "Sucesso")
        })
    }
  }
}
