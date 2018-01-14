import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KlijentService {

    constructor(private http: Http) { }

    vratiSveKlijente() {
        return this.http.get('http://localhost:3000/klijenti/vratisvezapise').map((res: any) => res.json());
    }

    addClient(klijent) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijenti/dodaj', klijent, {headers: headers}).map(res => res.json());
    }

    updateClient(klijent) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijenti/izmjena', klijent, {headers: headers}).map(res => res.json());
    }
}
