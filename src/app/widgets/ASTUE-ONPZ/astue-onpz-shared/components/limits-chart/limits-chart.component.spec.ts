import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsChartComponent } from './limits-chart.component';

describe('LimitsChartComponent', () => {
  let component: LimitsChartComponent;
  let fixture: ComponentFixture<LimitsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
