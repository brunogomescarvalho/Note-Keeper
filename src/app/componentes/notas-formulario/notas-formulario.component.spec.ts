import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFormularioComponent } from './notas-formulario.component';

describe('NotasFormularioComponent', () => {
  let component: NotasFormularioComponent;
  let fixture: ComponentFixture<NotasFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasFormularioComponent]
    });
    fixture = TestBed.createComponent(NotasFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
