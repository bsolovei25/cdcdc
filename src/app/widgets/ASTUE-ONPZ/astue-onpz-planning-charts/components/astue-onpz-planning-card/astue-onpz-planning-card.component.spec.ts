import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzPlanningCardComponent } from './astue-onpz-planning-card.component';

describe('AstueOnpzPlanningCardComponent', () => {
  let component: AstueOnpzPlanningCardComponent;
  let fixture: ComponentFixture<AstueOnpzPlanningCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzPlanningCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzPlanningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
