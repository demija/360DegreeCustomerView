import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class NavhomeService {
    private klijentSource = new BehaviorSubject<Object>({});
    currentKlijent = this.klijentSource.asObservable();

    private racunSource = new BehaviorSubject<Object>({});
    currentRacun = this.racunSource.asObservable();

    private depozisSource = new BehaviorSubject<Object>({});
    currentDepozit = this.depozisSource.asObservable();

    constructor(private http: Http) { }

    getClientData(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/klijenti/vratipodatke', data, {headers: headers})
            .map(res => res.json())
            .flatMap(klijent_rezultat => {
                const klId = {
                    klijent_id: klijent_rezultat.client._id
                }

                return Observable.forkJoin(
                    Observable.of(klijent_rezultat),
                    this.http.post('http://localhost:3000/racuni/vratipodatke', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/depoziti/vratipodatke', klId, {headers: headers}).map((res: any) => res.json())
                )
                .map((data: any[]) => {
                    let klijent_rezultat = data[0];
                    let racuni = data[1];
                    let depoziti = data[2];
                    klijent_rezultat.racuni = racuni;
                    klijent_rezultat.depoziti = depoziti;
                    return klijent_rezultat;
                });
            });
    }

    changeRacun(racuni) {
        this.racunSource.next(racuni);
    }

    changeClient(klijent) {
        this.klijentSource.next(klijent);
    }

    changeDeposit(depozit) {
        this.depozisSource.next(depozit);
    }
}
