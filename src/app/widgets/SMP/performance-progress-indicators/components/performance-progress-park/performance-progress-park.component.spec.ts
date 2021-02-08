import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressParkComponent } from './performance-progress-park.component';

describe('PerformanceProgressParkComponent', () => {
    let component: PerformanceProgressParkComponent;
    let fixture: ComponentFixture<PerformanceProgressParkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceProgressParkComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceProgressParkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
