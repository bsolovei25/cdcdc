import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverOverlayComponent } from './popover-overlay.component';

describe('PopoverOverlayComponent', () => {
    let component: PopoverOverlayComponent;
    let fixture: ComponentFixture<PopoverOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopoverOverlayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
