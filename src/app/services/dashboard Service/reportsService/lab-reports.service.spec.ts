import { TestBed } from '@angular/core/testing';

import { LabReportsService } from './lab-reports.service';

describe('LabReportsService', () => {
  let service: LabReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
