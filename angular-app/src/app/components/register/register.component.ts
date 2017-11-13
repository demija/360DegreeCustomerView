import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    ime_prezime: String;
    email: String;
    korisnicko_ime: String;
    lozinka: String;

    constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        const user = {
            ime_prezime: this.ime_prezime,
            email: this.email,
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka
        }

        // Required fields
        if(!this.validateService.validateRegister(user)) {
            //console.log('Greška!');

            this.flashMessagesService.show('Greška!', {cssClass: 'alert-danger', timeout: 3000});

            return false;
        }

        //validacija emaila na isti način, pozivm funkcije
    }

}
