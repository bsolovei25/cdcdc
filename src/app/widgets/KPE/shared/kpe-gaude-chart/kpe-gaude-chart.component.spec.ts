import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeGaudeChartComponent } from './kpe-gaude-chart.component';

describe('KpeGaudeChartComponent', () => {
  let component: KpeGaudeChartComponent;
  let fixture: ComponentFixture<KpeGaudeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpeGaudeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpeGaudeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
