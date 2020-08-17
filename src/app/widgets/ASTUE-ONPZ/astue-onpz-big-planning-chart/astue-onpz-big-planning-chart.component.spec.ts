import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzBigPlanningChartComponent } from './astue-onpz-big-planning-chart.component';

describe('AstueOnpzBigPlanningChartComponent', () => {
  let component: AstueOnpzBigPlanningChartComponent;
  let fixture: ComponentFixture<AstueOnpzBigPlanningChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzBigPlanningChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzBigPlanningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
