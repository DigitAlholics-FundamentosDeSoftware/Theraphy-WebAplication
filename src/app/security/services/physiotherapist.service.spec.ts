import { TestBed } from '@angular/core/testing';

import { PhysiotherapistService } from './physiotherapist.service';

describe('PhysiotherapistService', () => {
  let service: PhysiotherapistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysiotherapistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
