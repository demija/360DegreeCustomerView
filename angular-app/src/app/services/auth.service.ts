import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken: any;
    korisnik: any;

    constructor(private http: Http) { }

    registracijaKorisnika(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/registracija', korisnik, {headers: headers}).map(res => res.json());
    }

    updateUser(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/izmjena', korisnik, {headers: headers}).map(res => res.json());
    }

    autentifikacijaKorisnika(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/korisnici/autentifikacija', korisnik, {headers: headers})
        .map(res => res.json())
        .flatMap((data: any) => {
            if(data.user) {
                korisnik.id_korisnika = data.user.id,
                korisnik.ime = data.user.ime,
                korisnik.prezime = data.user.prezime
                korisnik.email = data.user.email,
                korisnik.odjel = data.user.odjel
            }
            
            korisnik.success = data.success;
            korisnik.msg = data.msg;

            return this.http.post('http://localhost:3000/arhiviranje/unosloga', korisnik, {headers: headers})
            .map((res: any) => {
                return data;
            });
        });
    }

    spasiPrijavljenogKorisnika(token, korisnik) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(korisnik)); //make to string, to store in localStorage

        this.authToken = token;
        this.korisnik = korisnik;
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.korisnik = null;
        localStorage.clear();
    }

    changeAdminRolle(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/adminrola', korisnik, {headers: headers}).map(res => res.json());
    }

    changeActivity(korisnik) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/aktivankorisnik', korisnik, {headers: headers}).map(res => res.json());
    }
}
