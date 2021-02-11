import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityStockCircleComponent } from './quality-stock-circle.component';

describe('QualityStockCircleComponent', () => {
    let component: QualityStockCircleComponent;
    let fixture: ComponentFixture<QualityStockCircleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityStockCircleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityStockCircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
