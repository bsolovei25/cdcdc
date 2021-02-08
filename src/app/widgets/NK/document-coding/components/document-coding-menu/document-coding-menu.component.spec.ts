import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingMenuComponent } from './document-coding-menu.component';

describe('DocumentCodingMenuComponent', () => {
    let component: DocumentCodingMenuComponent;
    let fixture: ComponentFixture<DocumentCodingMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentCodingMenuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentCodingMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
