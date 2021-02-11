import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsShipmentFormationComponent } from './oil-operations-shipment-formation.component';

describe('OilOperationsShipmentFormationComponent', () => {
    let component: OilOperationsShipmentFormationComponent;
    let fixture: ComponentFixture<OilOperationsShipmentFormationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsShipmentFormationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsShipmentFormationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
