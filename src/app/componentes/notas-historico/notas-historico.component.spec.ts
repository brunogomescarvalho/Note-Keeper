import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasHistoricoComponent } from './notas-historico.component';

describe('NotasHistoricoComponent', () => {
  let component: NotasHistoricoComponent;
  let fixture: ComponentFixture<NotasHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasHistoricoComponent]
    });
    fixture = TestBed.createComponent(NotasHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
