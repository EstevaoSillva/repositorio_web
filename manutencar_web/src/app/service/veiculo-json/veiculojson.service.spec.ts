import { TestBed } from '@angular/core/testing';

import { VeiculoJsonService } from './veiculojson.service';

describe('VeiculojsonService', () => {
  let service: VeiculoJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculoJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
