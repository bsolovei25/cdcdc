import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumReferenceRightComponent } from './petroleum-reference-right.component';

describe('PetroleumReferenceRightComponent', () => {
    let component: PetroleumReferenceRightComponent;
    let fixture: ComponentFixture<PetroleumReferenceRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumReferenceRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumReferenceRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
