import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, first } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria: Categoria;
  editar = false;

  constructor(
    private service: CategoriaHttpService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categoria = new Categoria();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.service.buscarPorId(id)
        .pipe(
          first()
        ).subscribe(dados => {
          this.categoria = dados;
          this.editar = true;
        })
    }
  }

  onSubmit() {
    if (!this.ehValido())
      return

    let observable = new Observable<Categoria>();

    if (this.categoria.id)
      observable = this.service.editar(this.categoria)
    else
      observable = this.service.cadastrar(this.categoria!)

    observable
      .pipe(
        first()
      )
      .subscribe((dados: Categoria) => {
        this.enviarMensagem(dados);
        this.router.navigate(['categorias/listar'])
      })
  }

  private enviarMensagem(dados: Categoria) {
    this.toast.success(`Categoria ${dados.nome} 
        ${(this.categoria.id ? 'editada' : 'cadastrada')}   
              com sucesso`, "Sucesso");
  }

  private ehValido() {
    if (!this.categoria.nome) {
      this.toast.error('O nome é obrigatório')
      return false;
    }
    if (this.categoria.nome.length < 3) {
      this.toast.error('O nome precisa ter no mínimo três letras')
      return false;
    }

    return true
  }

  voltar() {
    this.router.navigate(['listar'], { relativeTo: this.route.parent })
  }
}

