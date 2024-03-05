import { TestBed } from '@angular/core/testing';

import { CurriculumnsService } from './curriculumns.service';

describe('CurriculumnsService', () => {
  let service: CurriculumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
