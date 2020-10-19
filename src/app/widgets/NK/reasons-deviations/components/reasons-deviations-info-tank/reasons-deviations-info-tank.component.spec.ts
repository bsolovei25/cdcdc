import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsInfoTankComponent } from './reasons-deviations-info-tank.component';

describe('ReasonsDeviationsInfoTankComponent', () => {
  let component: ReasonsDeviationsInfoTankComponent;
  let fixture: ComponentFixture<ReasonsDeviationsInfoTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonsDeviationsInfoTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsDeviationsInfoTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
