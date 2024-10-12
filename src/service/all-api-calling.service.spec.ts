import { TestBed } from '@angular/core/testing';

import { AllApiCallingService } from './all-api-calling.service';

describe('AllApiCallingService', () => {
  let service: AllApiCallingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllApiCallingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
