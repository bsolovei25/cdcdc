import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsInfoContentComponent } from './reasons-deviations-info-content.component';

describe('ReasonsDeviationsInfoContentComponent', () => {
    let component: ReasonsDeviationsInfoContentComponent;
    let fixture: ComponentFixture<ReasonsDeviationsInfoContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReasonsDeviationsInfoContentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReasonsDeviationsInfoContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
