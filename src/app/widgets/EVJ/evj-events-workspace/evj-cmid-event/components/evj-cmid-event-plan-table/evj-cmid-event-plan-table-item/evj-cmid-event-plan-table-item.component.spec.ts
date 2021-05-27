import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjCmidEventPlanTableItemComponent } from './evj-cmid-event-plan-table-item.component';

describe('EvjCmidEventPlanTableItemComponent', () => {
  let component: EvjCmidEventPlanTableItemComponent;
  let fixture: ComponentFixture<EvjCmidEventPlanTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvjCmidEventPlanTableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjCmidEventPlanTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
