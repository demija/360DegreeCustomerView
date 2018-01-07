import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RacunService {

    constructor(private http: Http) { }

    tipoviUgovora() {
        return this.http.get('http://localhost:3000/racuni/tipoviugovoraracuna').map((res: any) => res.json());
    }

    pretraga(racun) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/racuni/pretragaracunareport', racun, {headers: headers}).map(res => res.json());
    }

    tipoviUgovoraKartica() {
        return this.http.get('http://localhost:3000/racuni/tipoviugovorakartica').map((res: any) => res.json());
    }

    tipoviKartica() {
        return this.http.get('http://localhost:3000/racuni/tipovikartica').map((res: any) => res.json());
    }

    vrsteKartica() {
        return this.http.get('http://localhost:3000/racuni/vrstekartica').map((res: any) => res.json());
    }

    pretragaKartica(kartica) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/racuni/pretragakarticareport', kartica, {headers: headers}).map(res => res.json());
    }
}
