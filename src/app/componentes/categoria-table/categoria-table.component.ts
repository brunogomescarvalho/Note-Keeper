import { Component, OnInit } from '@angular/core';
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

  constructor(private serviceCategoria: CategoriaHttpService) { }


  ngOnInit(): void {

    this.serviceCategoria.selecionarTodos().pipe(take(1))
      .subscribe((dados: Categoria[]) => {
        this.categorias = dados;
      })
  }



}
