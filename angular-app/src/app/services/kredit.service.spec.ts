/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KreditService } from './kredit.service';

describe('KreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KreditService]
    });
  });

  it('should ...', inject([KreditService], (service: KreditService) => {
    expect(service).toBeTruthy();
  }));
});
