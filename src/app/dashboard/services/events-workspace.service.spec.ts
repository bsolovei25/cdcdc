import { TestBed } from '@angular/core/testing';

import { EventsWorkspaceService } from './events-workspace.service';

describe('EventsWorkspaceService', () => {
  let service: EventsWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
