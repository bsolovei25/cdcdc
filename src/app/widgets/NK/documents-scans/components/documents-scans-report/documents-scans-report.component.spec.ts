import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsScansReportComponent } from './documents-scans-report.component';

describe('DocumentsScansReportComponent', () => {
    let component: DocumentsScansReportComponent;
    let fixture: ComponentFixture<DocumentsScansReportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DocumentsScansReportComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentsScansReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
