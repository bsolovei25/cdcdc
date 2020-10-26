import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsWorkspaceComponent } from './evj-events-workspace.component';

describe('EventsWorkspaceComponent', () => {
  let component: EvjEventsWorkspaceComponent;
  let fixture: ComponentFixture<EvjEventsWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
