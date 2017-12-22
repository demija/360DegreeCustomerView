import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavhomeService } from '../../services/navhome.service';
import { ValidateService } from '../../services/validate.service';
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
    prijavljeni_korisnik: Object;
    maticni_broj_search: String;
    klijent_id: String;

    constructor(private authService: AuthService, private navhomeService: NavhomeService, private validateService: ValidateService, private router: Router) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.prijavljeni_korisnik = profile.user;
        }, err => {
            return false;
        });
    }

    onLogoutClick() {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }

    onSearchClick() {
        const pretraga = {
            maticni_broj: this.maticni_broj_search,
            id_prijavljenog_korisnika: this.prijavljeni_korisnik['_id'],
            korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
        }

        //TODO
        // Validacija matičnog broja

        this.navhomeService.getClientData(pretraga).subscribe((klijent: any) => {
            if(klijent.success) {
                this.navhomeService.changeClient(klijent.client);
                this.navhomeService.changeRacun(klijent.racuni);
                this.navhomeService.changeDeposit(klijent.depoziti);
                this.navhomeService.changeKartice(klijent.kartice);
                this.navhomeService.changeKredite(klijent.krediti);
            } else {
                swal({
                    title: 'Greška!',
                    text: klijent.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });
            }
        });
    }
}
