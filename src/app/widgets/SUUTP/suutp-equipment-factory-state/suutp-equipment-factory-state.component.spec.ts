import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpEquipmentFactoryStateComponent } from './suutp-equipment-factory-state.component';

describe('SuutpEquipmentFactoryStateComponent', () => {
  let component: SuutpEquipmentFactoryStateComponent;
  let fixture: ComponentFixture<SuutpEquipmentFactoryStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpEquipmentFactoryStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpEquipmentFactoryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
