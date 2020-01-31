import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlanningMiddleComponent } from './product-planning-middle.component';

describe('ProductPlanningMiddleComponent', () => {
    let component: ProductPlanningMiddleComponent;
    let fixture: ComponentFixture<ProductPlanningMiddleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductPlanningMiddleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductPlanningMiddleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
