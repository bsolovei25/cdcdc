import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameTopComponent } from './frame-top.component';

describe('FrameTopComponent', () => {
    let component: FrameTopComponent;
    let fixture: ComponentFixture<FrameTopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FrameTopComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FrameTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
