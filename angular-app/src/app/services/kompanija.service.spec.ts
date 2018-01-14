/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KompanijaService } from './kompanija.service';

describe('KompanijaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KompanijaService]
    });
  });

  it('should ...', inject([KompanijaService], (service: KompanijaService) => {
    expect(service).toBeTruthy();
  }));
});
