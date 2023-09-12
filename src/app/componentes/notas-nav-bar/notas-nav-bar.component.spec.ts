import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasNavBarComponent } from './notas-nav-bar.component';

describe('NotasNavBarComponent', () => {
  let component: NotasNavBarComponent;
  let fixture: ComponentFixture<NotasNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasNavBarComponent]
    });
    fixture = TestBed.createComponent(NotasNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
