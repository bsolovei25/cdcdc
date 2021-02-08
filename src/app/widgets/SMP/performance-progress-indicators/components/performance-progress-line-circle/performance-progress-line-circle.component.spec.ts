import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressLineCircleComponent } from './performance-progress-line-circle.component';

describe('PerformanceProgressLineCircleComponent', () => {
    let component: PerformanceProgressLineCircleComponent;
    let fixture: ComponentFixture<PerformanceProgressLineCircleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceProgressLineCircleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceProgressLineCircleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
