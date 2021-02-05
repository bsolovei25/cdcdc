import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdMatBalanceChartCardComponent } from './cd-mat-balance-chart-card.component';

describe('CdMatBalanceChartCardComponent', () => {
    let component: CdMatBalanceChartCardComponent;
    let fixture: ComponentFixture<CdMatBalanceChartCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CdMatBalanceChartCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CdMatBalanceChartCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
