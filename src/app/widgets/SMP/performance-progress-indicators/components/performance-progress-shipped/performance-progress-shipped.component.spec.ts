import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressShippedComponent } from './performance-progress-shipped.component';

describe('PerformanceProgressShippedComponent', () => {
    let component: PerformanceProgressShippedComponent;
    let fixture: ComponentFixture<PerformanceProgressShippedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceProgressShippedComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceProgressShippedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
