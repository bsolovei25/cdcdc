import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsTankLevelComponent } from './reasons-deviations-tank-level.component';

describe('ReasonsDeviationsTankLevelComponent', () => {
  let component: ReasonsDeviationsTankLevelComponent;
  let fixture: ComponentFixture<ReasonsDeviationsTankLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonsDeviationsTankLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsDeviationsTankLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
