import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class BiljeskaService {

    constructor(private http: Http) { }

    dodaj(biljeska) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/biljeske/dodaj', biljeska, {headers: headers}).map(res => res.json());
    }

    biljeskeKorisnika(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/biljeske/biljeskekorisnika', korisnik, {headers: headers}).map(res => res.json());
    }

    sveBiljeske(biljeska) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/biljeske/svebiljeske', biljeska, {headers: headers}).map(res => res.json());
    }
}
