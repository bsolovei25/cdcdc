import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilControlTowerComponent } from './oil-control-tower.component';

describe('OilControlTowerComponent', () => {
  let component: OilControlTowerComponent;
  let fixture: ComponentFixture<OilControlTowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilControlTowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilControlTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
