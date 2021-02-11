import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityStockComponent } from './quality-stock.component';

describe('QualityStockComponent', () => {
    let component: QualityStockComponent;
    let fixture: ComponentFixture<QualityStockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityStockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityStockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
