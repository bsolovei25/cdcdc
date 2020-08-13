import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzMultiChartComponent } from './astue-onpz-multi-chart.component';

describe('AstueOnpzMultiChartComponent', () => {
  let component: AstueOnpzMultiChartComponent;
  let fixture: ComponentFixture<AstueOnpzMultiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzMultiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzMultiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
