import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotasHistoricoComponent } from './componentes/notas-historico/notas-historico.component';
import { NotasHomeComponent } from './componentes/notas-home/notas-home.component';
import { CategoriaFormComponent } from './componentes/categoria-form/categoria-form.component';
import { CategoriaTableComponent } from './componentes/categoria-table/categoria-table.component';
import { NotasEditarFormComponent } from './componentes/notas-editar-form/notas-editar-form.component';

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
    },{
      path:"editar/:id",
      component:NotasEditarFormComponent
    }]
  },

  {
    path: "categoria",
    children: [{
      path: "cadastrar",
      component: CategoriaFormComponent
    },
    {
      path: "listar",
      component: CategoriaTableComponent
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
