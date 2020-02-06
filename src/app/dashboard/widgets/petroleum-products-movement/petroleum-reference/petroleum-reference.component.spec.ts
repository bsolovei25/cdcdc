import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumReferenceComponent } from './petroleum-reference.component';

describe('PetroleumReferenceComponent', () => {
    let component: PetroleumReferenceComponent;
    let fixture: ComponentFixture<PetroleumReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumReferenceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumReferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
