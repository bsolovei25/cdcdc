import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationLimitsChartComponent } from './deviation-limits-chart.component';

describe('DeviationLimitsChartComponent', () => {
  let component: DeviationLimitsChartComponent;
  let fixture: ComponentFixture<DeviationLimitsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationLimitsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationLimitsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
