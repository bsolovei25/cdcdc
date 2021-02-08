import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingComponent } from './document-coding.component';

describe('DocumentCodingComponent', () => {
    let component: DocumentCodingComponent;
    let fixture: ComponentFixture<DocumentCodingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentCodingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentCodingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
