import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPeriodEditComponent } from './system-period-edit.component';

describe('SystemPeriodEditComponent', () => {
  let component: SystemPeriodEditComponent;
  let fixture: ComponentFixture<SystemPeriodEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPeriodEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPeriodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
