import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityStockSecurityComponent } from './quality-stock-security.component';

describe('QualityStockSecurityComponent', () => {
    let component: QualityStockSecurityComponent;
    let fixture: ComponentFixture<QualityStockSecurityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityStockSecurityComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityStockSecurityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
