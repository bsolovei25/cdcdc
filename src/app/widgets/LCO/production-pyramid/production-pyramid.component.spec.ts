import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPyramidComponent } from './production-pyramid.component';

describe('ProductionPyramidComponent', () => {
    let component: ProductionPyramidComponent;
    let fixture: ComponentFixture<ProductionPyramidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductionPyramidComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionPyramidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
