/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BiljeskaService } from './biljeska.service';

describe('BiljeskaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiljeskaService]
    });
  });

  it('should ...', inject([BiljeskaService], (service: BiljeskaService) => {
    expect(service).toBeTruthy();
  }));
});
