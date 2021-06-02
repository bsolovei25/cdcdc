import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpEquipmentFractionsProcessingComponent } from './suutp-equipment-fractions-processing.component';

describe('SuutpEquipmentFractionsProcessingComponent', () => {
  let component: SuutpEquipmentFractionsProcessingComponent;
  let fixture: ComponentFixture<SuutpEquipmentFractionsProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpEquipmentFractionsProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpEquipmentFractionsProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
