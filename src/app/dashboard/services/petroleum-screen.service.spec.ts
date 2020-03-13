import { TestBed } from '@angular/core/testing';

import { PetroleumScreenService } from './petroleum-screen.service';

describe('PetroleumScreenService', () => {
    let service: PetroleumScreenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PetroleumScreenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
