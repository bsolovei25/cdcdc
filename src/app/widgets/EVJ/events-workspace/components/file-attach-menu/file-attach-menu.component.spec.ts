import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachMenuComponent } from './file-attach-menu.component';

describe('FileAttachMenuComponent', () => {
    let component: FileAttachMenuComponent;
    let fixture: ComponentFixture<FileAttachMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileAttachMenuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileAttachMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
