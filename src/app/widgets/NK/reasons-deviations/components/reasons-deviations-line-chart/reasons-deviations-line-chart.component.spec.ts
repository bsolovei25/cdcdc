import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsLineChartComponent } from './reasons-deviations-line-chart.component';

describe('ReasonsDeviationsLineChartComponent', () => {
    let component: ReasonsDeviationsLineChartComponent;
    let fixture: ComponentFixture<ReasonsDeviationsLineChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReasonsDeviationsLineChartComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReasonsDeviationsLineChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
