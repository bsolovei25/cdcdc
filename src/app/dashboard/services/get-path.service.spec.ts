import { TestBed } from '@angular/core/testing';

import { GetPathService } from './get-path.service';

describe('GetPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPathService = TestBed.get(GetPathService);
    expect(service).toBeTruthy();
  });
});
