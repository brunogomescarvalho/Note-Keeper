import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasCardComponent } from './componentes/notas-card/notas-card.component';
import { NotasFormularioComponent } from './componentes/notas-formulario/notas-formulario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NotasListaComponent } from './componentes/notas-lista/notas-lista.component';
import { NotasNavBarComponent } from './componentes/notas-nav-bar/notas-nav-bar.component';
import { NotasHistoricoComponent } from './componentes/notas-historico/notas-historico.component';
import { NotasHomeComponent } from './componentes/notas-home/notas-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NotasCardComponent,
    NotasFormularioComponent,
    NotasListaComponent,
    NotasNavBarComponent,
    NotasHistoricoComponent,
    NotasHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
