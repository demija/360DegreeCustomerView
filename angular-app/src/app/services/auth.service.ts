import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;

    constructor(private http: Http) { }

    registerUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/registracija', user, {headers: headers}).map(res => res.json());
    }

    updateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/izmjenapodataka', user, {headers: headers}).map(res => res.json());
    }

    authenticateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/korisnici/autentifikacija', user, {headers: headers})
        .map(res => res.json())
        .flatMap((data: any) => {
            if(data.user) {
                user.id_korisnika = data.user.id,
                user.ime = data.user.ime,
                user.prezime = data.user.prezime
                user.email = data.user.email,
                user.odjel = data.user.odjel
            }
            
            user.success = data.success;
            user.msg = data.msg;

            return this.http.post('http://localhost:3000/arhiviranje/unosloga', user, {headers: headers})
            .map((res: any) => {
                return data;
            });
        });
    }

    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        
        return this.http.get('http://localhost:3000/korisnici/profil', {headers: headers}).map(res => res.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user)); //make to string, to store in localStorage

        this.authToken = token;
        this.user = user;
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
        this.user = null;
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
