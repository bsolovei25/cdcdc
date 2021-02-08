import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingTanksComponent } from './document-coding-tanks.component';

describe('DocumentCodingTanksComponent', () => {
    let component: DocumentCodingTanksComponent;
    let fixture: ComponentFixture<DocumentCodingTanksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentCodingTanksComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentCodingTanksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
