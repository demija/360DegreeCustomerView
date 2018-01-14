/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KlijentService } from './klijent.service';

describe('KlijentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KlijentService]
    });
  });

  it('should ...', inject([KlijentService], (service: KlijentService) => {
    expect(service).toBeTruthy();
  }));
});
