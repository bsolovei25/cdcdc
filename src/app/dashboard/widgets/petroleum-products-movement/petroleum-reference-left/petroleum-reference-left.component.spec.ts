import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumReferenceLeftComponent } from './petroleum-reference-left.component';

describe('PetroleumReferenceLeftComponent', () => {
    let component: PetroleumReferenceLeftComponent;
    let fixture: ComponentFixture<PetroleumReferenceLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumReferenceLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumReferenceLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
