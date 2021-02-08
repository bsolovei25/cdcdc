import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsReceivedOperationsComponent } from './oil-operations-received-operations.component';

describe('OilOperationsReceivedOperationsComponent', () => {
    let component: OilOperationsReceivedOperationsComponent;
    let fixture: ComponentFixture<OilOperationsReceivedOperationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsReceivedOperationsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsReceivedOperationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
