import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzsmCirclePlanningDiagramPlanComponent } from './ozsm-circle-planning-diagram-plan.component';

describe('OzsmCirclePlanningDiagramPlanComponent', () => {
  let component: OzsmCirclePlanningDiagramPlanComponent;
  let fixture: ComponentFixture<OzsmCirclePlanningDiagramPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzsmCirclePlanningDiagramPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzsmCirclePlanningDiagramPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
