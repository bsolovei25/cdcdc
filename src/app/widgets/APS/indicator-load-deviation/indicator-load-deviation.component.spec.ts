import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorLoadDeviationComponent } from './indicator-load-deviation.component';

describe('IndicatorLoadDeviationComponent', () => {
    let component: IndicatorLoadDeviationComponent;
    let fixture: ComponentFixture<IndicatorLoadDeviationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndicatorLoadDeviationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorLoadDeviationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
