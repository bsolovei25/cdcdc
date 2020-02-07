import { TestBed } from '@angular/core/testing';

import { NewUserSettingsService } from './new-user-settings.service';

describe('NewUserSettingsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NewUserSettingsService = TestBed.get(
            NewUserSettingsService
        );
        expect(service).toBeTruthy();
    });
});
