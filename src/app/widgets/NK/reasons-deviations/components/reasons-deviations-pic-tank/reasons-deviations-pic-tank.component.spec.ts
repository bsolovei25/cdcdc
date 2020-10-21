import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsPicTankComponent } from './reasons-deviations-pic-tank.component';

describe('ReasonsDeviationsPicTankComponent', () => {
  let component: ReasonsDeviationsPicTankComponent;
  let fixture: ComponentFixture<ReasonsDeviationsPicTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonsDeviationsPicTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsDeviationsPicTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
