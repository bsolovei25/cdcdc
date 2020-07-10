import { TestBed } from '@angular/core/testing';

import { SmpEventsService } from './smp-events.service';

describe('SmpEventsService', () => {
  let service: SmpEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmpEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
