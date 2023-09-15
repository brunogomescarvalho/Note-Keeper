import { Location } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';


@Component({
  selector: 'app-notas-editar-form',
  templateUrl: './notas-editar-form.component.html',
  styleUrls: ['./notas-editar-form.component.css']
})
export class NotasEditarFormComponent implements OnInit {

  @Injectable({
    providedIn: 'root'
  })

  categorias!: Categoria[];

  categoria!: Categoria;

  nota!: Nota;

  form!: FormGroup;

  constructor(
    private serviceHttp: CategoriaHttpService,
    private route: ActivatedRoute,
    private notasServiceHttp: NotasHttpService,
    private location:Location,
    private toast:ToastrService
  ) {
    this.nota = new Nota();
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obterCategorias();
    this.obterNota();
  }



 private iniciarFormulario() {
    this.form = new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl(null),
      conteudo: new FormControl(null),
      categoria: new FormControl(null),
      arquivado: new FormControl(null),
      tema: new FormControl(null)
    })
  }

  private carregarFormulario(nota: Nota) {
    this.form.setValue({
      id: nota.id,
      titulo: nota.titulo ? nota.titulo : "adicione um título...",
      conteudo: nota.conteudo,
      categoria: nota.categoriaId ? this.atribuirCategoria(nota) : null,
      arquivado: nota.arquivado,
      tema: nota.tema
    })
  }

  private atribuirCategoria(nota: Nota): any {
    return this.categoria = this.categorias.find(x => x.id == nota.categoriaId)!;
  }

  private obterNota() {
    const id = this.route.snapshot.params["id"];
    this.notasServiceHttp.selecionarPorId(id)
      .pipe(take(1))
         .subscribe((dados: Nota) => {
            this.nota = dados;
              this.carregarFormulario(this.nota)
      });
  }

  private obterCategorias() {
    this.serviceHttp.selecionarTodos()
      .pipe(take(1))
         .subscribe((dados: Categoria[]) => {
             this.categorias = dados;
      });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.nota.id = this.form.value.id;
      this.nota.tema = this.form.value.tema;
      this.nota.titulo = this.form.value.titulo;
      this.nota.conteudo = this.form.value.conteudo;
      this.nota.arquivado = this.form.value.arquivado;
      this.nota.categoriaId = this.form.value.categoria.id;

      this.notasServiceHttp.editarNota(this.nota)
         .pipe(take(1))
            .subscribe((dados: Nota) => {
              this.toast.success(`Nota ${dados.id} editada com sucesso`!)
                this.location.back();
        })

    }
  }

}
