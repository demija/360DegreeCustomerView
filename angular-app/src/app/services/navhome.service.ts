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

    private dodatnaUslugaSource = new BehaviorSubject<Object>({});
    currentDodatnaUsluga = this.dodatnaUslugaSource.asObservable();

    private arhivaPonudaSource = new BehaviorSubject<Object>({});
    currentArhivaPonuda = this.arhivaPonudaSource.asObservable();

    private preporucenaPonudaSource = new BehaviorSubject<Object>({});
    currentPreporucenaPonuda = this.preporucenaPonudaSource.asObservable();

    private timelineSource = new BehaviorSubject<Object>({});
    currentTimeline = this.timelineSource.asObservable();

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
                    this.http.post('http://localhost:3000/klijentidodatneusluge/vratiusluge', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/klijentiponude/vratipodatke', klId, {headers: headers}).map((res: any) => res.json()),
                    this.http.get('http://localhost:3000/ponude/vratiaktivneponude').map((res: any) => res.json()),
                    this.http.post('http://localhost:3000/pretrage/unosPretrage', pretraga, {headers: headers}).map((res: any) => res.json())
                )
                .map((data: any[]) => {
                    let klijent_rezultat = data[0];
                    let racuni = data[1];
                    let depoziti = data[2];
                    let kartice = data[3];
                    let krediti = data[4];
                    let biljeske = data[5];
                    let dodatneUsluge = data[6];
                    let arhivaponuda = data[7];
                    let preporuceneponude = data[8];

                    klijent_rezultat.racuni = racuni;
                    klijent_rezultat.depoziti = depoziti;
                    klijent_rezultat.kartice = kartice;
                    klijent_rezultat.krediti = krediti;
                    klijent_rezultat.biljeske = biljeske;
                    klijent_rezultat.dodatneUsluge = dodatneUsluge;
                    klijent_rezultat.arhivaponuda = arhivaponuda;
                    klijent_rezultat.preporuceneponude = preporuceneponude;

                    return klijent_rezultat;
                });
            }
        });
    }

    changeClient(klijent) {
        this.klijentSource.next(klijent);
    }

    changeRacun(racuni) {
        this.racunSource.next(racuni);
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

    changeDodatneUsluge(dodatnaUsluga) {
        this.dodatnaUslugaSource.next(dodatnaUsluga);
    }

    changeArhivaPonuda(arhivaPonude) {
        this.arhivaPonudaSource.next(arhivaPonude);
    }

    changePreporucenePonude(preporucenaPonuda) {
        this.preporucenaPonudaSource.next(preporucenaPonuda);
    }

    changeTimeline(klijent) {
        var time_line = [];

        if(klijent) {
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
        }

        this.timelineSource.next(time_line);
    }

    getOdjeli() {
        return this.http.get('http://localhost:3000/odjeli/vratisvepodatke').map((res: any) => res.json());
    }

    getPoslovnice() {
        return this.http.get('http://localhost:3000/poslovnice/vratisvepodatke').map((res: any) => res.json());
    }

    getKorisnici() {
        return this.http.get('http://localhost:3000/korisnici/vratisvepodatke').map((res: any) => res.json());
    }

    getSvePretrage(pretraga) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/pretrage/svepretrage', pretraga, {headers: headers}).map(res => res.json());
    }
}
