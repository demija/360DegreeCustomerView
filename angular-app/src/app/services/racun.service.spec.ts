/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RacunService } from './racun.service';

describe('RacunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RacunService]
    });
  });

  it('should ...', inject([RacunService], (service: RacunService) => {
    expect(service).toBeTruthy();
  }));
});
