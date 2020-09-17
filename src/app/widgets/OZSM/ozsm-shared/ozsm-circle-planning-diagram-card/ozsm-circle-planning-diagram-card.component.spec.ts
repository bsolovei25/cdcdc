import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzsmCirclePlanningDiagramCardComponent } from './ozsm-circle-planning-diagram-card.component';

describe('OzsmCirclePlanningDiagramCardComponent', () => {
  let component: OzsmCirclePlanningDiagramCardComponent;
  let fixture: ComponentFixture<OzsmCirclePlanningDiagramCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzsmCirclePlanningDiagramCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzsmCirclePlanningDiagramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
