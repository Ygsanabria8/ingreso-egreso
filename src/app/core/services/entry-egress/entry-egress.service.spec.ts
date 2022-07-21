import { TestBed } from '@angular/core/testing';

import { EntryEgressService } from './entry-egress.service';

describe('EntryEgressService', () => {
  let service: EntryEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryEgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
