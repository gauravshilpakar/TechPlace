import { TestBed } from '@angular/core/testing';

import { ExtUrlResolverService } from './ext-url-resolver.service';

describe('ExtUrlResolverService', () => {
  let service: ExtUrlResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtUrlResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
