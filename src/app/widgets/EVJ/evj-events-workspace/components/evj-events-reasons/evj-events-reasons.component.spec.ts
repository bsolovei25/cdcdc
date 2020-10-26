import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsReasonsComponent } from './evj-events-reasons.component';

describe('EventsReasonsComponent', () => {
  let component: EvjEventsReasonsComponent;
  let fixture: ComponentFixture<EvjEventsReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
