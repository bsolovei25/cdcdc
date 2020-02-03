import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupPlanningComponent } from './product-group-planning.component';

describe('ProductGroupPlanningComponent', () => {
    let component: ProductGroupPlanningComponent;
    let fixture: ComponentFixture<ProductGroupPlanningComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductGroupPlanningComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductGroupPlanningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
