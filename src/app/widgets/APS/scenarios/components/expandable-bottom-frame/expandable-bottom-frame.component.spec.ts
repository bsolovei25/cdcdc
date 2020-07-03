import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableBottomFrameComponent } from './expandable-bottom-frame.component';

describe('ExpandableBottomFrameComponent', () => {
    let component: ExpandableBottomFrameComponent;
    let fixture: ComponentFixture<ExpandableBottomFrameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExpandableBottomFrameComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpandableBottomFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
