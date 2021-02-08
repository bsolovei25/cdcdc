import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMotionComponent } from './raw-motion.component';

describe('RawMotionComponent', () => {
    let component: RawMotionComponent;
    let fixture: ComponentFixture<RawMotionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RawMotionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RawMotionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
