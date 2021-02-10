import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSelectorOverlayComponent } from './group-selector-overlay.component';

describe('GroupSelectorOverlayComponent', () => {
    let component: GroupSelectorOverlayComponent;
    let fixture: ComponentFixture<GroupSelectorOverlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupSelectorOverlayComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupSelectorOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
