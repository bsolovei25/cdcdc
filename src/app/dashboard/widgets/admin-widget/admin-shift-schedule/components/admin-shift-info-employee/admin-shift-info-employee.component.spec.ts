import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShiftInfoEmployeeComponent } from './admin-shift-info-employee.component';

describe('AdminShiftInfoEmployeeComponent', () => {
  let component: AdminShiftInfoEmployeeComponent;
  let fixture: ComponentFixture<AdminShiftInfoEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShiftInfoEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShiftInfoEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
