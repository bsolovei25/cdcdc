import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsAdjustmentComponent } from './oil-operations-adjustment.component';

describe('OilOperationsAdjustmentComponent', () => {
  let component: OilOperationsAdjustmentComponent;
  let fixture: ComponentFixture<OilOperationsAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilOperationsAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilOperationsAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
