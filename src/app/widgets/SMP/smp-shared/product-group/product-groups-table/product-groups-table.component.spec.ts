import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupsTableComponent } from './product-groups-table.component';

describe('ProductGroupsTableComponent', () => {
    let component: ProductGroupsTableComponent;
    let fixture: ComponentFixture<ProductGroupsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductGroupsTableComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductGroupsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
