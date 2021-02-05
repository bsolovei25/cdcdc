import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeLineChartComponent } from './kpe-line-chart.component';

describe('KpeLineChartComponent', () => {
    let component: KpeLineChartComponent;
    let fixture: ComponentFixture<KpeLineChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KpeLineChartComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KpeLineChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
