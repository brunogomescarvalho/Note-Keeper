import { Location } from '@angular/common';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Nota, Tema } from 'src/app/models/nota';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';


@Component({
  selector: 'app-notas-form',
  templateUrl: './notas-form.component.html',
  styleUrls: ['./notas-form.component.css']
})
export class NotasFormComponent implements OnInit {

  @Injectable({
    providedIn: 'root'
  })

  editar: boolean = false

  categorias!: Categoria[];

  categoria!: Categoria;

  nota!: Nota;

  form!: FormGroup;

  @Output() onMostrarCategoria = new EventEmitter();

  constructor(
    private serviceHttp: CategoriaHttpService,
    private route: ActivatedRoute,
    private notasServiceHttp: NotasHttpService,
    private location: Location,
    private toast: ToastrService
  ) { this.nota = new Nota() }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obterCategorias();
    this.configurarPagina();
  }

  public onSubmit() {
    if (this.form.valid) {
      this.nota.id = this.form.value.id;
      this.nota.tema = this.form.value.tema;
      this.nota.titulo = this.form.value.titulo;
      this.nota.conteudo = this.form.value.conteudo;
      this.nota.arquivado = this.form.value.arquivado;
      this.nota.categoriaId = this.form.value.categoria.id;

      if (this.nota.id)
        this.editarNota();
      else {
        this.cadastrarNota();
      }

    }
  }

  private iniciarFormulario() {
    this.form = new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl(null),
      conteudo: new FormControl(null),
      categoria: new FormControl(null),
      arquivado: new FormControl(false),
      tema: new FormControl('dark')
    })
  }

  private carregarFormulario(nota: Nota) {
    this.form.setValue({
      id: nota?.id,
      titulo: nota?.titulo,
      conteudo: nota.conteudo,
      categoria: nota.categoriaId ? this.atribuirCategoria(nota) : null,
      arquivado: nota?.arquivado,
      tema: nota?.tema
    })
  }

  private atribuirCategoria(nota: Nota): any {
    return this.categoria = this.categorias.find(x => x.id == nota.categoriaId)!;
  }

  public atribuirTema(tema: Tema) {
    this.form.value.tema = tema
  }

  private configurarPagina() {
    const id = this.route.snapshot.params["id"];

    if (id) {
      this.obterNota(id);
      this.editar = true
    }
  }


  private editarNota() {
    this.notasServiceHttp.editarNota(this.nota)
      .pipe(take(1))
      .subscribe((dados: Nota) => {
        this.toast.success(`Nota ${dados.id} editada com sucesso`!);
        this.location.back();
      });
  }

  private cadastrarNota() {
    this.notasServiceHttp.criarNota(this.nota)
      .pipe(take(1))
      .subscribe((dados: Nota) => {
        this.toast.success(`Nota ${dados.id} cadastrada com sucesso`!);
        this.location.back();
      });
  }

  private obterNota(id: any) {
    this.notasServiceHttp.selecionarPorId(id)
      .pipe(take(1))
      .subscribe((dados: Nota) => {
        this.nota = dados;
        this.carregarFormulario(this.nota);
      });
  }

  private obterCategorias() {
    this.serviceHttp.selecionarTodos()
      .pipe(take(1))
      .subscribe((dados: Categoria[]) => {
        this.categorias = dados;
      });
  }

  voltar() {
    this.location.back();
  }

}
