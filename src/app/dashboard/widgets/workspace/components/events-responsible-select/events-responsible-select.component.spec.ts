import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsResponsibleSelectComponent } from './events-responsible-select.component';

describe('EventsResponsibleSelectComponent', () => {
  let component: EventsResponsibleSelectComponent;
  let fixture: ComponentFixture<EventsResponsibleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsResponsibleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsResponsibleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
