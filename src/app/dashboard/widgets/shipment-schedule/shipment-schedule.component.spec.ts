import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentScheduleComponent } from './shipment-schedule.component';

describe('ShipmentScheduleComponent', () => {
    let component: ShipmentScheduleComponent;
    let fixture: ComponentFixture<ShipmentScheduleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShipmentScheduleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShipmentScheduleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
