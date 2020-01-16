import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingEnergyIndicatorComponent } from './ring-energy-indicator.component';

describe('RingEnergyIndicatorComponent', () => {
    let component: RingEnergyIndicatorComponent;
    let fixture: ComponentFixture<RingEnergyIndicatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RingEnergyIndicatorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RingEnergyIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
