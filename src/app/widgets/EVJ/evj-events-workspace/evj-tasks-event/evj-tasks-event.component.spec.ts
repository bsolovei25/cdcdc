import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjTasksEventComponent } from './evj-tasks-event.component';

describe('TasksEventComponent', () => {
  let component: EvjTasksEventComponent;
  let fixture: ComponentFixture<EvjTasksEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjTasksEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjTasksEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
