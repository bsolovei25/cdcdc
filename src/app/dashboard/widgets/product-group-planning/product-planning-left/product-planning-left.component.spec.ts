import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlanningLeftComponent } from './product-planning-left.component';

describe('ProductPlanningLeftComponent', () => {
    let component: ProductPlanningLeftComponent;
    let fixture: ComponentFixture<ProductPlanningLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductPlanningLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductPlanningLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
