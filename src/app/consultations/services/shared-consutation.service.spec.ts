import { TestBed } from '@angular/core/testing';

import { SharedConsutationService } from './shared-consutation.service';

describe('SharedConsutationService', () => {
  let service: SharedConsutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedConsutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
