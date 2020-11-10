import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsCorrectCardComponent } from './evj-events-correct-card.component';

describe('EventsCorrectCardComponent', () => {
  let component: EvjEventsCorrectCardComponent;
  let fixture: ComponentFixture<EvjEventsCorrectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsCorrectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsCorrectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
