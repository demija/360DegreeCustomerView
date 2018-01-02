/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KarticaService } from './kartica.service';

describe('KarticaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KarticaService]
    });
  });

  it('should ...', inject([KarticaService], (service: KarticaService) => {
    expect(service).toBeTruthy();
  }));
});
