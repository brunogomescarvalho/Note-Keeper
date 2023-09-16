import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasCardComponent } from './componentes/notas-card/notas-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotasListaComponent } from './componentes/notas-lista/notas-lista.component';
import { NotasNavBarComponent } from './componentes/notas-nav-bar/notas-nav-bar.component';
import { NotasHistoricoComponent } from './componentes/notas-historico/notas-historico.component';
import { NotasHomeComponent } from './componentes/notas-home/notas-home.component';
import { BarraCoresComponent } from './componentes/barra-cores/barra-cores.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaTableComponent } from './componentes/categoria-table/categoria-table.component';
import { CategoriaFormComponent } from './componentes/categoria-form/categoria-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotasFormComponent } from './componentes/notas-form/notas-form.component';
import { NotasFiltrarComponent } from './componentes/notas-filtrar/notas-filtrar.component';


@NgModule({
  declarations: [
    AppComponent,
    NotasCardComponent,
    NotasListaComponent,
    NotasNavBarComponent,
    NotasHistoricoComponent,
    NotasHomeComponent,
    BarraCoresComponent,
    CategoriaTableComponent,
    CategoriaFormComponent,
    NotasFormComponent,
    NotasFiltrarComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
