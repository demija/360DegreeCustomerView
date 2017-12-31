import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DepozitService {

    constructor(private http: Http) { }

    getSveTipoveDepozita() {
        return this.http.get('http://localhost:3000/depoziti/vratisvetipove').map((res: any) => res.json());
    }

    getDepozite(depozit) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/depoziti/vratidepozite', depozit, {headers: headers}).map(res => res.json());
    }
}
