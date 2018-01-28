import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavhomeService } from '../../services/navhome.service';
import { ValidateService } from '../../services/validate.service';
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
    prijavljeni_korisnik: Object;
    maticni_broj_search: String;
    klijent_id: String;

    constructor(private authService: AuthService, private navhomeService: NavhomeService, private validateService: ValidateService, private router: Router) { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));
    }

    onLogoutClick() {
        this.authService.logout();
        this.clearSearch();
        this.router.navigate(['/login']);
        return false;
    }

    onSearchClick() {
        if(!this.validateService.validateSearch()) {
            this.validateService.pokreniSwal('Greška!', 'Unesi ispravan matični broj', 'warning', 'Uredu');
            return false;
        }

        const pretraga = {
            maticni_broj: this.maticni_broj_search,
            id_prijavljenog_korisnika: this.prijavljeni_korisnik['_id'],
            id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
            ime: this.prijavljeni_korisnik['ime'],
            prezime: this.prijavljeni_korisnik['prezime'],
            korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime'],
            odjel: this.prijavljeni_korisnik['odjel'],
            poslovnica: this.prijavljeni_korisnik['poslovnica']
        }

        this.navhomeService.getClientData(pretraga).subscribe((klijent: any) => {
            if(klijent.success) {
                this.navhomeService.changeClient(klijent.client);
                this.navhomeService.changeRacun(klijent.racuni);
                this.navhomeService.changeDeposit(klijent.depoziti);
                this.navhomeService.changeKartice(klijent.kartice);
                this.navhomeService.changeKredite(klijent.krediti);
                this.navhomeService.changeBiljeske(klijent.biljeske);
                this.navhomeService.changeDodatneUsluge(klijent.dodatneUsluge);
                this.navhomeService.changeArhivaPonuda(klijent.arhivaponuda);
                this.navhomeService.changePreporucenePonude(klijent.preporuceneponude);
                this.navhomeService.changeTimeline(klijent);
            } else {
                this.validateService.pokreniSwal('Greška!', klijent.msg, 'error', 'Uredu');
            }
        });
    }

    clearSearch() {
        this.navhomeService.changeClient([]);
        this.navhomeService.changeRacun([]);
        this.navhomeService.changeDeposit([]);
        this.navhomeService.changeKartice([]);
        this.navhomeService.changeKredite([]);
        this.navhomeService.changeBiljeske([]);
        this.navhomeService.changeDodatneUsluge([]);
        this.navhomeService.changeArhivaPonuda([]);
        this.navhomeService.changePreporucenePonude([]);
        this.navhomeService.changeTimeline(null);
    }
}
