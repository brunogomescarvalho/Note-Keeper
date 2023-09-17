import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, first } from 'rxjs';
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

  categoria: Categoria = {};
  categorias: Categoria[] = [];
  editar: boolean = false
  nota!: Nota;
  form!: FormGroup;
  tema!: Tema;

  @Output() onMostrarCategoria = new EventEmitter();

  constructor(
    private serviceHttp: CategoriaHttpService,
    private route: ActivatedRoute,
    private notasServiceHttp: NotasHttpService,
    private toast: ToastrService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.nota = this.route.snapshot.data['nota'];
    this.iniciarFormulario(this.nota)
    this.obterCategorias().subscribe(dados => {
      this.categorias = dados;
      this.form.patchValue({ 'categoria': this.atribuirCategoria(this.nota) });
    })
  }

  public atribuirTema(tema: Tema) {
    this.form.value.tema = tema
  }

  public onSubmit() {

    if (this.form.valid) {
      this.nota.id = this.form.value.id;
      this.nota.tema = this.form.value.tema;
      this.nota.titulo = this.form.value.titulo;
      this.nota.conteudo = this.form.value.conteudo;
      this.nota.arquivado = this.form.value.arquivado;
      this.nota.categoriaId = this.form.value.categoria.id;

      this.salvarDados();
    }
    else
      this.mostrarErros();
  }

  private salvarDados(): void {
    let observable = new Observable<Nota>();

    if (this.nota.id)
      observable = this.notasServiceHttp.editarNota(this.nota);
    else {
      observable = this.notasServiceHttp.criarNota(this.nota);
    }

    observable.pipe(first()).subscribe(() => {
      this.toast.success(`Nota ${this.nota.id ? 'editada' : 'cadastrada'} com sucesso`!);
      this.router.navigate(['/']);
    });
  }


  private mostrarErros(): void {
    if (!this.nota.titulo || this.nota.titulo.length < 3)
      this.toast.error("O titulo é obrigatorio com no mínimo 3 letras");

    if (!this.nota.conteudo || this.nota.conteudo.length < 5)
      this.toast.error("O conteudo é obrigatorio com no mínimo 5 letras");

    if (!this.nota.categoriaId)
      this.toast.error("A categoria é obrigatória");
  }


  private iniciarFormulario(nota: Nota) {
    this.form = this.formBuilder.group({
      id: [nota.id],
      titulo: [nota.titulo, [Validators.required, Validators.minLength(3)]],
      conteudo: [nota.conteudo, [Validators.required, Validators.minLength(5)]],
      categoria: [null, [Validators.required]],
      arquivado: [false],
      tema: ['dark']
    })
  }


  private atribuirCategoria(nota: Nota): Categoria | null {
    return nota.categoriaId ? this.categorias.find(x => x.id == nota.categoriaId)! : null
  }

  private obterCategorias(): Observable<Categoria[]> {
    return this.serviceHttp.selecionarTodos()
  }

  public mostrarCategoria() {
    this.categoria = this.form.value.categoria
  }

  voltar() {
    this.location.back()
  }

}
