import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpEquipmentKupnComponent } from './suutp-equipment-kupn.component';

describe('SuutpEquipmentKupnComponent', () => {
  let component: SuutpEquipmentKupnComponent;
  let fixture: ComponentFixture<SuutpEquipmentKupnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpEquipmentKupnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpEquipmentKupnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
