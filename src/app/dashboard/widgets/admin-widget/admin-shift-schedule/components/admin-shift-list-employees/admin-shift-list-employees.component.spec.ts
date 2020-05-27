import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShiftListEmployeesComponent } from './admin-shift-list-employees.component';

describe('AdminShiftListEmployeesComponent', () => {
  let component: AdminShiftListEmployeesComponent;
  let fixture: ComponentFixture<AdminShiftListEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShiftListEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShiftListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
