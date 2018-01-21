import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProfilService {

    constructor(private http: Http) { }

    brojPretraga(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/pretrage/brojpretraga', korisnik, {headers: headers}).map(res => res.json());
    }
}
