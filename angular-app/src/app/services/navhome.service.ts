import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NavhomeService {
    private klijentSource = new BehaviorSubject<Object>({});
    currentKlijent = this.klijentSource.asObservable();

    private racunSource = new BehaviorSubject<Object>({});
    currentRacun = this.racunSource.asObservable();

    constructor(private http: Http) { }

    /*getClientData(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/klijenti/vratipodatke', data, {headers: headers}).map(res => res.json());
    }*/

    getClientData(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/klijenti/vratipodatke', data, {headers: headers})
            .map(res => res.json())
            .flatMap(klijent_rezultat => {
                const klId = {
                    klijent_id: klijent_rezultat.client._id
                }

                return this.http.post('http://localhost:3000/racuni/vratipodatke', klId, {headers: headers})
                .map((res: any) => {
                    let racuni = res.json();
                    klijent_rezultat.racuni = racuni;
                    return klijent_rezultat;
                });
            })
    }

    changeRacun(racuni) {
        this.racunSource.next(racuni);
    }

    changeClient(klijent) {
        this.klijentSource.next(klijent);
    }
}
