import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendTableComponent } from './trend-table.component';

describe('TrendTableComponent', () => {
  let component: TrendTableComponent;
  let fixture: ComponentFixture<TrendTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
