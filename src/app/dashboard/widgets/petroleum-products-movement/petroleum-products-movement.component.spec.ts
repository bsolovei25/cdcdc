import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumProductsMovementComponent } from './petroleum-products-movement.component';

describe('PetroleumProductsMovementComponent', () => {
  let component: PetroleumProductsMovementComponent;
  let fixture: ComponentFixture<PetroleumProductsMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetroleumProductsMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetroleumProductsMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
