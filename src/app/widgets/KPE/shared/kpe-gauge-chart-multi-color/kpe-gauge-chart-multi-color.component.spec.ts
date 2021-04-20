import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeGaugeChartMultiColorComponent } from './kpe-gauge-chart-multi-color.component';

describe('KpeGaugeChartMultiColorComponent', () => {
  let component: KpeGaugeChartMultiColorComponent;
  let fixture: ComponentFixture<KpeGaugeChartMultiColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpeGaugeChartMultiColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpeGaugeChartMultiColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
