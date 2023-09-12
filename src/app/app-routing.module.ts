import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotasHistoricoComponent } from './componentes/notas-historico/notas-historico.component';
import { NotasHomeComponent } from './componentes/notas-home/notas-home.component';

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
    path: "historico",
    component: NotasHistoricoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
