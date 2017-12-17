import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PonudeService {

    constructor(private http: Http) { }

    dodajPonudu(ponuda) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/ponude/dodaj', ponuda, {headers: headers}).map(res => res.json());
    }

    getPonude() {
        return this.http.get('http://localhost:3000/ponude/vratisvepodatke').map((res: any) => res.json());
    }

    obrisiPonudu(ponuda) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/ponude/obrisi', ponuda, {headers: headers}).map(res => res.json());
    }

    changeActivity(ponuda) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/ponude/aktivnaponuda', ponuda, {headers: headers}).map(res => res.json());
    }

}
