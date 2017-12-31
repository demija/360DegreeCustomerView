/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepozitService } from './depozit.service';

describe('DepozitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepozitService]
    });
  });

  it('should ...', inject([DepozitService], (service: DepozitService) => {
    expect(service).toBeTruthy();
  }));
});
