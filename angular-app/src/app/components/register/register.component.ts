import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    id_uposlenika: String;
    ime: String;
    prezime: String;
    email: String;
    korisnicko_ime: String;
    lozinka: String;
    potvrdaLozinke: String;
    odjel: Object;
    poslovnica: Object;
    datum_registracije: Date;
    odjeliLista: Object;
    poslovniceLista: Object;
    prikaziPoslovnicu: Boolean = false;

    constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.navhomeService.getOdjeli().subscribe(data => {
            this.odjeliLista = data;
        });

        this.navhomeService.getPoslovnice().subscribe(data => {
            this.poslovniceLista = data;
        });
    }

    onOdjelChange() {
        if(this.odjel['organizaciona_jedinica'] == 'Sektor poslova sa stanovništvom') {
            this.prikaziPoslovnicu = true;
        } else {
            this.prikaziPoslovnicu = false;
            this.poslovnica = null;
        }
    }

    registracija() {
        const korisnik = {
            id_uposlenika: this.id_uposlenika,
            ime: this.ime,
            prezime: this.prezime,
            email: this.email,
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka,
            potvrdaLozinke: this.potvrdaLozinke,
            odjel: this.odjel,
            aktivan: true,
            administrator: false
        }

        if(this.poslovnica) {
            korisnik['poslovnica'] = this.poslovnica;
        }

        // Validacija unesenih vrijednosti
        if(!this.validateService.validacijaRegistracije(korisnik)) {
            return false;
        }

        // Registracija korisnika
        this.authService.registracijaKorisnika(korisnik).subscribe(data => {
            if(data.success) {
                this.validateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
                this.router.navigate(['/login']);
            } else {
                this.validateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
                this.router.navigate(['/registracija']);
            }
        });
    }
}
