import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventDescriptionComponent } from './evj-event-description.component';

describe('EventDescriptionComponent', () => {
  let component: EvjEventDescriptionComponent;
  let fixture: ComponentFixture<EvjEventDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
