/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PonudeService } from './ponude.service';

describe('PonudeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PonudeService]
    });
  });

  it('should ...', inject([PonudeService], (service: PonudeService) => {
    expect(service).toBeTruthy();
  }));
});
