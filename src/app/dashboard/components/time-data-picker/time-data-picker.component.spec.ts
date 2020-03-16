import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDataPickerComponent } from './time-data-picker.component';

describe('TimeDataPickerComponent', () => {
  let component: TimeDataPickerComponent;
  let fixture: ComponentFixture<TimeDataPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeDataPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
