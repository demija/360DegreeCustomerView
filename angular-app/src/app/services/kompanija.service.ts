import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KompanijaService {

    constructor(private http: Http) { }

    vratiSveKompanije() {
        return this.http.get('http://localhost:3000/kompanije/vratisvezapise').map((res: any) => res.json());
    }

    novaKompanija(kompanija) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/kompanije/dodaj', kompanija, {headers: headers}).map(res => res.json());
    }
}
