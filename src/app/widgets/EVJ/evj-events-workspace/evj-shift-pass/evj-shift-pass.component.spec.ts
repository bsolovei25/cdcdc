import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjShiftPassComponent } from './evj-shift-pass.component';

describe('ShiftPassComponent', () => {
  let component: EvjShiftPassComponent;
  let fixture: ComponentFixture<EvjShiftPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjShiftPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjShiftPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
