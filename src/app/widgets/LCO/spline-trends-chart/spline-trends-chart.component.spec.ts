import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineTrendsChartComponent } from './spline-trends-chart.component';

describe('SplineTrendsChartComponent', () => {
    let component: SplineTrendsChartComponent;
    let fixture: ComponentFixture<SplineTrendsChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SplineTrendsChartComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplineTrendsChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
