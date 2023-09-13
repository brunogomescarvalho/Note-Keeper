import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraCoresComponent } from './barra-cores.component';

describe('BarraCoresComponent', () => {
  let component: BarraCoresComponent;
  let fixture: ComponentFixture<BarraCoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraCoresComponent]
    });
    fixture = TestBed.createComponent(BarraCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
