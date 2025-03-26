import { TestBed } from '@angular/core/testing';

import { HodometroService } from './hodometro.service';

describe('HodometroService', () => {
  let service: HodometroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HodometroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
