import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumMotionAccountingComponent } from './petroleum-motion-accounting.component';

describe('PetroleumMotionAccountingComponent', () => {
    let component: PetroleumMotionAccountingComponent;
    let fixture: ComponentFixture<PetroleumMotionAccountingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumMotionAccountingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumMotionAccountingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
