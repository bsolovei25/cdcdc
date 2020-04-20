import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPeriodDateMonthComponent } from './system-period-date-month.component';

describe('SystemPeriodDateMonthComponent', () => {
  let component: SystemPeriodDateMonthComponent;
  let fixture: ComponentFixture<SystemPeriodDateMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPeriodDateMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPeriodDateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
