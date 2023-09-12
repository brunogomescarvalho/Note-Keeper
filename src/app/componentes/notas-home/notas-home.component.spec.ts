import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasHomeComponent } from './notas-home.component';

describe('NotasHomeComponent', () => {
  let component: NotasHomeComponent;
  let fixture: ComponentFixture<NotasHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasHomeComponent]
    });
    fixture = TestBed.createComponent(NotasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
