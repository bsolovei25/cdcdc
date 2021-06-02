import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpEquipmentPrimaryProcessesComponent } from './suutp-equipment-primary-processes.component';

describe('SuutpEquipmentPrimaryProcessesComponent', () => {
  let component: SuutpEquipmentPrimaryProcessesComponent;
  let fixture: ComponentFixture<SuutpEquipmentPrimaryProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpEquipmentPrimaryProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpEquipmentPrimaryProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
