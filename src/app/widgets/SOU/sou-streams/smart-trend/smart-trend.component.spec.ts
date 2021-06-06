import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTrendComponent } from './smart-trend.component';

describe('SmartTrendComponent', () => {
  let component: SmartTrendComponent;
  let fixture: ComponentFixture<SmartTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
