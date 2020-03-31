import { TestBed } from '@angular/core/testing';

import { WidgetService } from './widget.service';

describe('WidgetsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: WidgetService = TestBed.get(WidgetService);
        expect(service).toBeTruthy();
    });
});
