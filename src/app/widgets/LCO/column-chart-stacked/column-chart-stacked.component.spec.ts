import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnChartStackedComponent } from './column-chart-stacked.component';

describe('ColumnChartStackedComponent', () => {
    let component: ColumnChartStackedComponent;
    let fixture: ComponentFixture<ColumnChartStackedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColumnChartStackedComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColumnChartStackedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
