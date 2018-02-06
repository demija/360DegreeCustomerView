import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    korisnicko_ime: String;
    lozinka: String;

    constructor(
        private authService: AuthService,
        private validateService: ValidateService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    prijava() {
        const korisnik = {
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka,
            domain: 'korisnik360.ba'
        }

        // Validacija unesenih vrijednosti
        if(!this.validateService.validacijaLogina(korisnik)) {
            return false;
        }

        // Autentifikacija
        this.authService.autentifikacijaKorisnika(korisnik).subscribe(data => {
            if(data.success) {
                this.validateService.pokreniSwal('Dobro došli ' + data.user.ime + ' ' + data.user.prezime + '!', '', 'info', 'Uredu');
                this.authService.spasiPrijavljenogKorisnika(data.token, data.user); // Spašavanje podataka priajvljenog korisnika u local storage
                this.router.navigate(['/']);
            } else {
                this.validateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
                this.router.navigate(['/login']);
            }
        });
    }
}
