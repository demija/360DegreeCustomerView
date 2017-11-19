import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    korisnicko_ime: String;
    lozinka: String;

    constructor(private authService: AuthService, private validateService: ValidateService, private router: Router) { }

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka
        }

        // Validacija unesenih vrijednosti
        if(!this.validateService.validateLogin(user)) {
            return false;
        }

        this.authService.authenticateUser(user).subscribe(data => {
            if(data.success) {
                swal({
                    type: 'info',
                    title: 'Dobro došli ' + data.user.ime,
                    showConfirmButton: false,
                    timer: 2000
                })

                this.authService.storeUserData(data.token, data.user);
                this.router.navigate(['/']);
            } else {
                swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                })

                this.router.navigate(['/login']);
            }
        });
    }
}
