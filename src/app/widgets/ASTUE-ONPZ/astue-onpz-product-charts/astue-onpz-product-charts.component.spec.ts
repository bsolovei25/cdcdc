import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzProductChartsComponent } from './astue-onpz-product-charts.component';

describe('AstueOnpzProductChartsComponent', () => {
  let component: AstueOnpzProductChartsComponent;
  let fixture: ComponentFixture<AstueOnpzProductChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzProductChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzProductChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
