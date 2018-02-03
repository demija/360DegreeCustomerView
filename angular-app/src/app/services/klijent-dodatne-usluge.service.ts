import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KlijentDodatneUslugeService {

    constructor(private http: Http) { }

    vratiSveZapise() {
        return this.http.get('http://localhost:3000/klijentidodatneusluge/vratisvezapise').map((res: any) => res.json());
    }
}
