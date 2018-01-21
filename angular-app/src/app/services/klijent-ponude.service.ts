import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KlijentPonudeService {

    constructor(private http: Http) { }

    novaKlijentPonuda(ponuda) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijentiponude/dodaj', ponuda, {headers: headers}).map(res => res.json());
    }

    ponudeKorisnika(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijentiponude/ponudekorisnika', korisnik, {headers: headers}).map(res => res.json());
    }
}
