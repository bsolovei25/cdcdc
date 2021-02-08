import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceProgressIndicatorsComponent } from './performance-progress-indicators.component';

describe('PerformanceProgressIndicatorsComponent', () => {
    let component: PerformanceProgressIndicatorsComponent;
    let fixture: ComponentFixture<PerformanceProgressIndicatorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PerformanceProgressIndicatorsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PerformanceProgressIndicatorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
