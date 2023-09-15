import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasEditarFormComponent } from './notas-editar-form.component';

describe('NotasEditarFormComponent', () => {
  let component: NotasEditarFormComponent;
  let fixture: ComponentFixture<NotasEditarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasEditarFormComponent]
    });
    fixture = TestBed.createComponent(NotasEditarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
