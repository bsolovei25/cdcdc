import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShiftBrigadeComponent } from './admin-shift-brigade.component';

describe('AdminShiftBrigadeComponent', () => {
  let component: AdminShiftBrigadeComponent;
  let fixture: ComponentFixture<AdminShiftBrigadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShiftBrigadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShiftBrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
