import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsComponent } from './evj-events.component';

describe('EvjEventComponent', () => {
  let component: EvjEventsComponent;
  let fixture: ComponentFixture<EvjEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
