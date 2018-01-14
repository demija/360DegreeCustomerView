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

    private karticaSource = new BehaviorSubject<Object>({});
    currentKartica = this.karticaSource.asObservable();

    private kreditSource = new BehaviorSubject<Object>({});
    currentKredit = this.kreditSource.asObservable();

    private biljeskaSource = new BehaviorSubject<Object>({});
    currentBiljeska = this.biljeskaSource.asObservable();

    private timelineSource = new BehaviorSubject<Object>({});
    currentTimeline = this.timelineSource.asObservable();

    private client: any;

    constructor(private http: Http) { }

    getClientData(pretraga): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/klijenti/vratipodatke', pretraga, {headers: headers})
        .map(res => res.json())
        .flatMap(klijent_rezultat => {
            if(!klijent_rezultat.success) {
                return Observable.forkJoin(
                    Observable.of(klijent_rezultat),
                )
                .map((data: any[]) => {
                    return klijent_rezultat;
                });
            } else {
                const klId = {
                    klijent_id: klijent_rezultat.client._id
                }

                return Observable.forkJoin(
                    Observable.of(klijent_rezultat),
                    this.http.post('http://localhost:3000/racuni/vratipodatke', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/depoziti/vratipodatke', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/racuni/vratikartice', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/krediti/vratipodatke', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/biljeske/vratibiljeske', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/pretrage/unosPretrage', pretraga, {headers: headers}).map((res: any) => res.json())
                )
                .map((data: any[]) => {
                    let klijent_rezultat = data[0];
                    let racuni = data[1];
                    let depoziti = data[2];
                    let kartice = data[3];
                    let krediti = data[4];
                    let biljeske = data[5];

                    klijent_rezultat.racuni = racuni;
                    klijent_rezultat.depoziti = depoziti;
                    klijent_rezultat.kartice = kartice;
                    klijent_rezultat.krediti = krediti;
                    klijent_rezultat.biljeske = biljeske;

                    return klijent_rezultat;
                });
            }
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

    changeKartice(kartica) {
        this.karticaSource.next(kartica);
    }

    changeKredite(kredit) {
        this.kreditSource.next(kredit);
    }

    changeBiljeske(biljeska) {
        this.biljeskaSource.next(biljeska);
    }

    changeTimeline(klijent) {
        var time_line = [];

        for(let racuni of klijent.racuni.data) {
            racuni.type = 'racun';
            time_line.push(racuni);
        }

        for(let depoziti of klijent.depoziti.data) {
            depoziti.type = 'depozit';
            time_line.push(depoziti);
        }

        for(let element of klijent.kartice.data) {
            for(let kartica of element.kartica) {
                kartica.type = 'kartica';
                kartica.racunUgovor = element.ugovor;
                time_line.push(kartica);
            }
        }

        for(let krediti of klijent.krediti.data) {
            krediti.type = 'kredit';
            time_line.push(krediti);
        }

        time_line.sort((a, b) => new Date(b.datum_ugovora).getTime() - new Date(a.datum_ugovora).getTime());

        this.timelineSource.next(time_line);
    }

    getOdjeli() {
        return this.http.get('http://localhost:3000/odjeli/vratisvepodatke').map((res: any) => res.json());
    }

    getKorisnici() {
        return this.http.get('http://localhost:3000/korisnici/vratisvepodatke').map((res: any) => res.json());
    }
}
