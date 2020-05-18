import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTrendInstallationsComponent } from './production-trend-installations.component';

describe('ProductionTrendInstallationsComponent', () => {
  let component: ProductionTrendInstallationsComponent;
  let fixture: ComponentFixture<ProductionTrendInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionTrendInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionTrendInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
