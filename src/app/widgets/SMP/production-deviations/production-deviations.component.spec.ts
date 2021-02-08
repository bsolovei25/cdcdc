import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDeviationsComponent } from './production-deviations.component';

describe('ProductionDeviationsComponent', () => {
    let component: ProductionDeviationsComponent;
    let fixture: ComponentFixture<ProductionDeviationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionDeviationsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionDeviationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
