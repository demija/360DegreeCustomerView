/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KlijentDodatneUslugeService } from './klijent-dodatne-usluge.service';

describe('KlijentDodatneUslugeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KlijentDodatneUslugeService]
    });
  });

  it('should ...', inject([KlijentDodatneUslugeService], (service: KlijentDodatneUslugeService) => {
    expect(service).toBeTruthy();
  }));
});
