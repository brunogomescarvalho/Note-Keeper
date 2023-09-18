import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { Nota } from 'src/app/models/nota';


@Component({
  selector: 'app-categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrls: ['./categoria-table.component.css'],
})
export class CategoriaTableComponent implements OnInit {

  categorias?: Categoria[];

  constructor(
    private serviceCategoria: CategoriaHttpService,
    private servicoNota: NotasHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {

    this.serviceCategoria.selecionarTodos()
      .pipe(first()).subscribe((dados: Categoria[]) => {
        this.categorias = dados;
      })
  }


  excluir(categoria: Categoria, index: number) {

    this.servicoNota.buscarNotasPorCategoria(categoria.id!).subscribe(notas => {
      if (notas.length > 0)
        notas.forEach((x: Nota) => this.servicoNota.excluirNota(Number(x.id)).subscribe())
    })

    this.serviceCategoria.excluir(categoria.id!).subscribe(() => {
      this.categorias?.splice(index, 1);
    })
  }

  editar(categoria: Categoria) {
    this.router.navigate(['editar', categoria.id], { relativeTo: this.route.parent })
  }

  abrirModal(c: Categoria, index: number) {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);
    modalRef.componentInstance.titulo = 'Excluír Categoria'
    modalRef.componentInstance.question = 'Confirma excluír essa categoria? '
    modalRef.componentInstance.msg = 'Todas as notas relacionadas a ela também serão excluidas!';

    modalRef.result.then(result => {
      if (result == 'ok')
        this.excluir(c, index)
    })
  }

}
