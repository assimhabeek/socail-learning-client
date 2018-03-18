import { TestBed, inject } from '@angular/core/testing';

import { Token.StorageService } from './token.storage.service';

describe('Token.StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Token.StorageService]
    });
  });

  it('should be created', inject([Token.StorageService], (service: Token.StorageService) => {
    expect(service).toBeTruthy();
  }));
});
