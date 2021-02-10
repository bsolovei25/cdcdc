import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsDeviationsComponent } from './reasons-deviations.component';

describe('ReasonsDeviationsComponent', () => {
    let component: ReasonsDeviationsComponent;
    let fixture: ComponentFixture<ReasonsDeviationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReasonsDeviationsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReasonsDeviationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
