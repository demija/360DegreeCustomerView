import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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

    authenticateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://localhost:3000/korisnici/autentifikacija', user, {headers: headers}).map(res => res.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user)); //make to string, to store in localStorage

        this.authToken = token;
        this.user = user;
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

}
