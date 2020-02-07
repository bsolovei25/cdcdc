import { TestBed } from '@angular/core/testing';

import { MaterialControllerService } from './material-controller.service';

describe('MaterialControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialControllerService = TestBed.get(MaterialControllerService);
    expect(service).toBeTruthy();
  });
});
