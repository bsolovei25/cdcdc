import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameBottomComponent } from './frame-bottom.component';

describe('FrameBottomComponent', () => {
    let component: FrameBottomComponent;
    let fixture: ComponentFixture<FrameBottomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FrameBottomComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FrameBottomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
