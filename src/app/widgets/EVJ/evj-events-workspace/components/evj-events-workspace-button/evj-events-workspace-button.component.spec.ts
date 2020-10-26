import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsWorkspaceButtonComponent } from './evj-events-workspace-button.component';

describe('EventsWorkspaceButtonComponent', () => {
  let component: EvjEventsWorkspaceButtonComponent;
  let fixture: ComponentFixture<EvjEventsWorkspaceButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventsWorkspaceButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventsWorkspaceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
