import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsLeftComponent } from './product-groups-left.component';

describe('ProductGroupsLeftComponent', () => {
    let component: ProductGroupsLeftComponent;
    let fixture: ComponentFixture<ProductGroupsLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductGroupsLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductGroupsLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
