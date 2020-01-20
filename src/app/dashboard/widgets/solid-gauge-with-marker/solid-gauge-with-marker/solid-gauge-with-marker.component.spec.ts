import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidGaugeWithMarkerComponent } from './solid-gauge-with-marker.component';

describe('SolidGaugeWithMarkerComponent', () => {
    let component: SolidGaugeWithMarkerComponent;
    let fixture: ComponentFixture<SolidGaugeWithMarkerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SolidGaugeWithMarkerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SolidGaugeWithMarkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
