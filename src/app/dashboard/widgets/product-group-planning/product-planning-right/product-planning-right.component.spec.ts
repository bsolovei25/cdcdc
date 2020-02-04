import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlanningRightComponent } from './product-planning-right.component';

describe('ProductPlanningRightComponent', () => {
    let component: ProductPlanningRightComponent;
    let fixture: ComponentFixture<ProductPlanningRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductPlanningRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductPlanningRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
