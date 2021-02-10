import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsFreeShipmentComponent } from './oil-operations-free-shipment.component';

describe('OilOperationsFreeShipmentComponent', () => {
    let component: OilOperationsFreeShipmentComponent;
    let fixture: ComponentFixture<OilOperationsFreeShipmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsFreeShipmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsFreeShipmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
