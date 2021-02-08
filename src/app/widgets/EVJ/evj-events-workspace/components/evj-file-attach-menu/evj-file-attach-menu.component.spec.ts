import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjFileAttachMenuComponent } from './evj-file-attach-menu.component';

describe('FileAttachMenuComponent', () => {
    let component: EvjFileAttachMenuComponent;
    let fixture: ComponentFixture<EvjFileAttachMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjFileAttachMenuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjFileAttachMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
