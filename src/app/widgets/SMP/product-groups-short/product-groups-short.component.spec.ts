import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsShortComponent } from './product-groups-short.component';

describe('ProductGroupsShortComponent', () => {
    let component: ProductGroupsShortComponent;
    let fixture: ComponentFixture<ProductGroupsShortComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductGroupsShortComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductGroupsShortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
