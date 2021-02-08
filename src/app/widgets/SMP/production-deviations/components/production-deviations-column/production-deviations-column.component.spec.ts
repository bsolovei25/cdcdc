import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDeviationsColumnComponent } from './production-deviations-column.component';

describe('ProductionDeviationsColumnComponent', () => {
    let component: ProductionDeviationsColumnComponent;
    let fixture: ComponentFixture<ProductionDeviationsColumnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionDeviationsColumnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionDeviationsColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
