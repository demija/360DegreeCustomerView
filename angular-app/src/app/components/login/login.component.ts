import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    korisnicko_ime: String;
    lozinka: String;

    constructor(private authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) { }

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka
        }

        this.authService.authenticateUser(user).subscribe(data => {
            if(data.success) {
                this.authService.storeUserData(data.token, data.user);
                this.flashMessagesService.show('Uspješno prijavljeno!', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/']);
            } else {
                this.flashMessagesService.show('Greška prilikom prijave! ' + data.msg, {cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['/login']);
            }
        });
    }

}
