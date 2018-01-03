import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KarticaService {

    constructor(private http: Http) { }

    tipoviUgovora() {
        return this.http.get('http://localhost:3000/kartice/tipoviugovora').map((res: any) => res.json());
    }

    tipoviKartica() {
        return this.http.get('http://localhost:3000/kartice/tipovikartica').map((res: any) => res.json());
    }

    vrsteKartica() {
        return this.http.get('http://localhost:3000/kartice/vrstekartica').map((res: any) => res.json());
    }

    pretraga(kartica) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/kartice/pretragareport', kartica, {headers: headers}).map(res => res.json());
    }
}
