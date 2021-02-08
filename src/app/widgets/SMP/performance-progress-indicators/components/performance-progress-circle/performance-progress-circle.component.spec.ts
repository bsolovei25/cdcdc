import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressCircleComponent } from './performance-progress-circle.component';

describe('PerformanceProgressCircleComponent', () => {
    let component: PerformanceProgressCircleComponent;
    let fixture: ComponentFixture<PerformanceProgressCircleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceProgressCircleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceProgressCircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
