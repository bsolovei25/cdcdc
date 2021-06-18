import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeChartsAnalyticViewComponent } from './kpe-charts-analytic-view.component';

describe('KpeChartsAnalyticViewComponent', () => {
  let component: KpeChartsAnalyticViewComponent;
  let fixture: ComponentFixture<KpeChartsAnalyticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpeChartsAnalyticViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpeChartsAnalyticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
