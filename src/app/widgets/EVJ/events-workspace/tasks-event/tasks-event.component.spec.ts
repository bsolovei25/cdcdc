import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEventComponent } from './tasks-event.component';

describe('TasksEventComponent', () => {
  let component: TasksEventComponent;
  let fixture: ComponentFixture<TasksEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
