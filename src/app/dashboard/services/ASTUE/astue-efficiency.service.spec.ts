import { TestBed } from '@angular/core/testing';

import { AstueEfficiencyService } from './astue-efficiency.service';

describe('AstueEfficiencyService', () => {
  let service: AstueEfficiencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstueEfficiencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
