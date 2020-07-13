import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationDetailsComponent } from './deviation-details.component';

describe('DeviationDetailsComponent', () => {
    let component: DeviationDetailsComponent;
    let fixture: ComponentFixture<DeviationDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeviationDetailsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviationDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
