import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsRightComponent } from './product-groups-right.component';

describe('ProductGroupsRightComponent', () => {
  let component: ProductGroupsRightComponent;
  let fixture: ComponentFixture<ProductGroupsRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupsRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
