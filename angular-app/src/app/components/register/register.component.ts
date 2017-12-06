import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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
    datum_registracije: Date;
    odjeliLista: Object;

    constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.navhomeService.getOdjeli().subscribe(odjeli => {
            this.odjeliLista = odjeli;
        })
    }

    onRegisterSubmit() {
        const user = {
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

        // Validacija unesenih vrijednosti
        if(!this.validateService.validateRegister(user)) {
            return false;
        }

        // Registracija korisnika
        this.authService.registerUser(user).subscribe(data => {
            if(data.success) {
                swal({
                    //position: 'top-right',
                    type: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });

                this.router.navigate(['/login']);
            } else {
                swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });

                this.router.navigate(['/registracija']);
            }
        });
    }
}
