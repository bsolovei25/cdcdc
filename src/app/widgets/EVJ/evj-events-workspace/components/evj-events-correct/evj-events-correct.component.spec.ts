import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsCorrectComponent } from './evj-events-correct.component';

describe('EventsCorrectComponent', () => {
  let component: EvjEventsCorrectComponent;
  let fixture: ComponentFixture<EvjEventsCorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsCorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
