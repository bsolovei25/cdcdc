import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWidgetsGridComponent } from './new-widgets-grid.component';

describe('NewWidgetsGridComponent', () => {
  let component: NewWidgetsGridComponent;
  let fixture: ComponentFixture<NewWidgetsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWidgetsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWidgetsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
