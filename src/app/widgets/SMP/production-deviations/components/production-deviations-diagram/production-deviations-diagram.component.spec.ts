import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDeviationsDiagramComponent } from './production-deviations-diagram.component';

describe('ProductionDeviationsDiagramComponent', () => {
    let component: ProductionDeviationsDiagramComponent;
    let fixture: ComponentFixture<ProductionDeviationsDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionDeviationsDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionDeviationsDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
