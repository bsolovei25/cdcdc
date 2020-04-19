import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPeriodDateDayComponent } from './system-period-date-day.component';

describe('SystemPeriodDateDayComponent', () => {
  let component: SystemPeriodDateDayComponent;
  let fixture: ComponentFixture<SystemPeriodDateDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPeriodDateDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPeriodDateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
