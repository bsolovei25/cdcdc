import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsListWindowComponent } from './evj-events-list-window.component';

describe('EventsListWindowComponent', () => {
  let component: EvjEventsListWindowComponent;
  let fixture: ComponentFixture<EvjEventsListWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsListWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsListWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
