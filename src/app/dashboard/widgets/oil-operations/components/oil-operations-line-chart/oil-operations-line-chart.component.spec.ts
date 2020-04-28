import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsLineChartComponent } from './oil-operations-line-chart.component';

describe('OilOperationsLineChartComponent', () => {
  let component: OilOperationsLineChartComponent;
  let fixture: ComponentFixture<OilOperationsLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilOperationsLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilOperationsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
