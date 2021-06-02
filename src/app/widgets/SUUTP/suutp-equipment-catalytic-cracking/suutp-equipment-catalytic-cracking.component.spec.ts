import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpEquipmentCatalyticCrackingComponent } from './suutp-equipment-catalytic-cracking.component';

describe('SuutpEquipmentCatalyticCrackingComponent', () => {
  let component: SuutpEquipmentCatalyticCrackingComponent;
  let fixture: ComponentFixture<SuutpEquipmentCatalyticCrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpEquipmentCatalyticCrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpEquipmentCatalyticCrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
