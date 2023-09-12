import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasCardComponent } from './notas-card.component';

describe('NotasCardComponent', () => {
  let component: NotasCardComponent;
  let fixture: ComponentFixture<NotasCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasCardComponent]
    });
    fixture = TestBed.createComponent(NotasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
