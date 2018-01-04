import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KreditService {

    constructor(private http: Http) { }

    tipoviUgovora() {
        return this.http.get('http://localhost:3000/krediti/tipoviugovora').map((res: any) => res.json());
    }

    pretraga(kredit) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/krediti/pretragareport', kredit, {headers: headers}).map(res => res.json());
    }
}
