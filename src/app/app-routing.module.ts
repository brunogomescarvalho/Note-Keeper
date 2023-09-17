import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotasHistoricoComponent } from './componentes/notas-historico/notas-historico.component';
import { NotasHomeComponent } from './componentes/notas-home/notas-home.component';
import { CategoriaFormComponent } from './componentes/categoria-form/categoria-form.component';
import { CategoriaTableComponent } from './componentes/categoria-table/categoria-table.component';
import { NotasFormComponent } from './componentes/notas-form/notas-form.component';
import { ResolverNota } from './services/routeService/resolver-nota.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: NotasHomeComponent
  },
  {
    path: "notas",
    children: [{
      path: "arquivo",
      component: NotasHistoricoComponent
    }, {
      path: "editar/:id",
      component: NotasFormComponent,
      resolve: {
        nota: ResolverNota
      }
    }, {
      path: "criar",
      component: NotasFormComponent,
      resolve: {
        nota: ResolverNota
      }
    }]
  },

  {
    path: "categorias",
    children: [{
      path: "cadastrar",
      component: CategoriaFormComponent
    },
    {
      path: "listar",
      component: CategoriaTableComponent
    },
    {
      path: "editar/:id",
      component: CategoriaFormComponent
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
