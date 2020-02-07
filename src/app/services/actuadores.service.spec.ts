import { TestBed } from '@angular/core/testing';

import { ActuadoresService } from './actuadores.service';

describe('ActuadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActuadoresService = TestBed.get(ActuadoresService);
    expect(service).toBeTruthy();
  });
});
