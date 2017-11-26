import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class NavhomeService {
    private klijentSource = new BehaviorSubject<Object>({});
    currentKlijent = this.klijentSource.asObservable();

    constructor(private http: Http) { }

    getClientData(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijenti/vratipodatke', data, {headers: headers}).map(res => res.json());
    }

    changeClient(klijent) {
        this.klijentSource.next(klijent);
    }
}
