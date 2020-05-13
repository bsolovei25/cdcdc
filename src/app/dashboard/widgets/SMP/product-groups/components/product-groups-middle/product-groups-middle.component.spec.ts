import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsMiddleComponent } from './product-groups-middle.component';

describe('ProductGroupsMiddleComponent', () => {
  let component: ProductGroupsMiddleComponent;
  let fixture: ComponentFixture<ProductGroupsMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupsMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupsMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
