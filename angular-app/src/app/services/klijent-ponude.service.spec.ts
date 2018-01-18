/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KlijentPonudeService } from './klijent-ponude.service';

describe('KlijentPonudeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KlijentPonudeService]
    });
  });

  it('should ...', inject([KlijentPonudeService], (service: KlijentPonudeService) => {
    expect(service).toBeTruthy();
  }));
});
