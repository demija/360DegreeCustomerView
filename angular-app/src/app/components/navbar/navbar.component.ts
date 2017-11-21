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

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    onLogoutClick() {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
