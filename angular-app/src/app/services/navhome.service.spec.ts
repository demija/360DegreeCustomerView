/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavhomeService } from './navhome.service';

describe('NavhomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavhomeService]
    });
  });

  it('should ...', inject([NavhomeService], (service: NavhomeService) => {
    expect(service).toBeTruthy();
  }));
});
