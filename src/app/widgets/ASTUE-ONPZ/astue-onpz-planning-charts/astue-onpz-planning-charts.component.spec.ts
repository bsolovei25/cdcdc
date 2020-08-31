import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzPlanningChartsComponent } from './astue-onpz-planning-charts.component';

describe('AstueOnpzPlanningChartsComponent', () => {
  let component: AstueOnpzPlanningChartsComponent;
  let fixture: ComponentFixture<AstueOnpzPlanningChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzPlanningChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzPlanningChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
