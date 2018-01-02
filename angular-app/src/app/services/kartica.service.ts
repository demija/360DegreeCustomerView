import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class KarticaService {

    constructor(private http: Http) { }

    vratiSveTipove() {
        return this.http.get('http://localhost:3000/kartice/vratisvetipove').map((res: any) => res.json());
    }

    pretraga(kartica) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/kartice/vratikartice', kartica, {headers: headers}).map(res => res.json());
    }
}
