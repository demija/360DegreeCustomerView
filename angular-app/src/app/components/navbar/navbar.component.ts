import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavhomeService } from '../../services/navhome.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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
    korisnik: Object;
    maticni_broj_search: String;
    klijent_id: String;

    constructor(private authService: AuthService, private navhomeService: NavhomeService, private router: Router) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.korisnik = profile.user;
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

    onSearchClick() {
        const data = {
            maticni_broj: this.maticni_broj_search
        }

        this.navhomeService.getClientData(data).subscribe((klijent: any) => {
            if(klijent.success) {
                this.navhomeService.changeClient(klijent.client);
                this.navhomeService.changeRacun(klijent.racuni);
            } else {
                swal({
                    title: 'Greška!',
                    text: klijent.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                })
            }
        });
    }

    /*onSearchClick() {
        const data = {
            maticni_broj: this.maticni_broj_search
        }

        this.navhomeService.getClientData(data).subscribe(client => {
            if(client.success) {
                this.navhomeService.changeClient(client.client);
            } else {
                swal({
                    title: 'Greška!',
                    text: client.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                })
            }
        });
    }*/
}
