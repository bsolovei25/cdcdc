import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTrackComponent } from './line-chart-track.component';

describe('LineChartTrackComponent', () => {
    let component: LineChartTrackComponent;
    let fixture: ComponentFixture<LineChartTrackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LineChartTrackComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LineChartTrackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
