import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    dan = new Date().getUTCDate();
    mjesec = new Date().getUTCMonth() + 1;
    godina = new Date().getUTCFullYear();
    datum = this.dan + "/" + this.mjesec + "/" + this.godina;
    korisnickoime: String;
    imePrezime: String;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.imePrezime = profile.user.ime + " " + profile.user.prezime;
            this.korisnickoime = profile.user.korisnicko_ime;
        }, err => {
            console.log('greška!');
            return false;
        });
    }

    onLogoutClick() {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
