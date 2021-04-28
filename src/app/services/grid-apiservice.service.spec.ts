import { TestBed } from '@angular/core/testing';

import { GridAPIServiceService } from './grid-apiservice.service';

describe('GridAPIServiceService', () => {
  let service: GridAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
