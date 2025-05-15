import { TestBed } from '@angular/core/testing';

import { BookrequestService } from './bookrequest.service';

describe('BookrequestService', () => {
  let service: BookrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
