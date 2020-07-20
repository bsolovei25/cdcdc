import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeEqualizerChartComponent } from './kpe-equalizer-chart.component';

describe('KpeEqualizerChartComponent', () => {
    let component: KpeEqualizerChartComponent;
    let fixture: ComponentFixture<KpeEqualizerChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KpeEqualizerChartComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KpeEqualizerChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
