import { TestBed } from '@angular/core/testing';

import { DocumentsScansService } from './documents-scans.service';

describe('DocumentsScansService', () => {
    let service: DocumentsScansService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DocumentsScansService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
