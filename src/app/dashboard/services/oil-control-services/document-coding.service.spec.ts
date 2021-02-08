import { TestBed } from '@angular/core/testing';

import { DocumentCodingService } from './document-coding.service';

describe('DocumentCodingService', () => {
    let service: DocumentCodingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DocumentCodingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
