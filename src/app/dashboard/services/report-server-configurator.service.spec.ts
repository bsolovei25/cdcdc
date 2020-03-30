import { TestBed } from '@angular/core/testing';

import { ReportServerConfiguratorService } from './report-server-configurator.service';

describe('ReportServerConfiguratorService', () => {
  let service: ReportServerConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportServerConfiguratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
