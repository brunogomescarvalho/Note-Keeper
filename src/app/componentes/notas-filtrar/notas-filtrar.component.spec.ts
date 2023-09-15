import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFiltrarComponent } from './notas-filtrar.component';

describe('NotasFiltrarComponent', () => {
  let component: NotasFiltrarComponent;
  let fixture: ComponentFixture<NotasFiltrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasFiltrarComponent]
    });
    fixture = TestBed.createComponent(NotasFiltrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
