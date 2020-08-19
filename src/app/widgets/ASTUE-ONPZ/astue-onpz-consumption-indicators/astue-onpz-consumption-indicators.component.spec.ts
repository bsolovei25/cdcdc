import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzConsumptionIndicatorsComponent } from './astue-onpz-consumption-indicators.component';

describe('AstueOnpzConsumptionIndicatorsComponent', () => {
  let component: AstueOnpzConsumptionIndicatorsComponent;
  let fixture: ComponentFixture<AstueOnpzConsumptionIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzConsumptionIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzConsumptionIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
