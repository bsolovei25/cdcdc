import { TestBed } from '@angular/core/testing';

import { MboDataControllerService } from './mbo-data-controller.service';

describe('MboDataControllerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MboDataControllerService = TestBed.get(
            MboDataControllerService
        );
        expect(service).toBeTruthy();
    });
});
