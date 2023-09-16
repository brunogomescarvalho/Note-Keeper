import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';

@Component({
  selector: 'app-categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrls: ['./categoria-table.component.css']
})
export class CategoriaTableComponent implements OnInit {


  categorias?: Categoria[];

  constructor(
    private serviceCategoria: CategoriaHttpService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

    this.serviceCategoria.selecionarTodos().pipe(take(1))
      .subscribe((dados: Categoria[]) => {
        this.categorias = dados;
      })
  }


  excluir(categoria: Categoria, index: number) {

    this.serviceCategoria.excluir(categoria.id!)
      .subscribe(x => {
        this.categorias?.splice(index, 1);

      })
  }

  editar(categoria: Categoria) {
    this.router.navigate(['editar', categoria.id], { relativeTo: this.route.parent })
  }

}
