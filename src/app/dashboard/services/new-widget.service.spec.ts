import { TestBed } from '@angular/core/testing';

import { NewWidgetService } from './new-widget.service';

describe('NewWidgetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewWidgetService = TestBed.get(NewWidgetService);
    expect(service).toBeTruthy();
  });
});
