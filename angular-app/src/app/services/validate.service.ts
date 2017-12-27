import { Injectable, transition } from '@angular/core';

@Injectable()
export class ValidateService {

    constructor() { }

    validateLogin(user) {
        let valid = true;

        document.getElementById('loginSpinner').classList.remove('invisible');

        if(user.korisnicko_ime == undefined || user.korisnicko_ime == '') {
            document.getElementById('korisnickoimeTextbox').classList.add('is-invalid');
            document.getElementById('korisnickoimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
            document.getElementById('korisnickoimeError').classList.add('d-none');
        }

        if(user.lozinka == undefined || user.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            document.getElementById('lozinkaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
            document.getElementById('lozinkaError').classList.add('d-none');
        }

        return valid;
    }

    validateRegister(user) {
        let valid = true;

        if(user.id_uposlenika == undefined || user.id_uposlenika == '') {
            document.getElementById('idUposlenikaTextbox').classList.add('is-invalid');
            document.getElementById('idUposlenikaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('idUposlenikaTextbox').classList.remove('is-invalid');
            document.getElementById('idUposlenikaError').classList.add('d-none');
            //valid = true;
        }

        if(user.ime == undefined || user.ime == '') {
            document.getElementById('imeTextbox').classList.add('is-invalid');
            document.getElementById('imeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('imeTextbox').classList.remove('is-invalid');
            document.getElementById('imeError').classList.add('d-none');
            //valid = true;
        }

        if(user.prezime == undefined || user.prezime == '') {
            document.getElementById('prezimeTextbox').classList.add('is-invalid');
            document.getElementById('prezimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('prezimeTextbox').classList.remove('is-invalid');
            document.getElementById('prezimeError').classList.add('d-none');
            //valid = true;
        }

        if(user.email == undefined || user.email == '' || !this.validateEmail(user.email)) {
            document.getElementById('emailTextbox').classList.add('is-invalid');
            document.getElementById('emailError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('emailTextbox').classList.remove('is-invalid');
            document.getElementById('emailError').classList.add('d-none');
            //valid = true;
        }

        if(user.korisnicko_ime == undefined || user.korisnicko_ime == '' || user.korisnicko_ime.length < 5) {
            document.getElementById('korisnickoimeTextbox').classList.add('is-invalid');
            document.getElementById('korisnickoimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
            document.getElementById('korisnickoimeError').classList.add('d-none');
            //valid = true;
        }

        if(user.lozinka == undefined || user.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            document.getElementById('lozinkaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
            document.getElementById('lozinkaError').classList.add('d-none');
            //valid = true;
        }

        if(user.potvrdaLozinke == undefined || user.potvrdaLozinke == '' || user.potvrdaLozinke != user.lozinka) {
            document.getElementById('potvrdaLozinkeTextbox').classList.add('is-invalid');
            document.getElementById('potvrdaLozinkeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('potvrdaLozinkeTextbox').classList.remove('is-invalid');
            document.getElementById('potvrdaLozinkeError').classList.add('d-none');
            //valid = true;
        }

        if(user.odjel == undefined) {
            document.getElementById('odjelDropbox').classList.add('is-invalid');
            document.getElementById('odjelError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('odjelDropbox').classList.remove('is-invalid');
            document.getElementById('odjelError').classList.add('d-none');
            //valid = true;
        }

        return valid;
    }

    validateUpdate(user) {
        let valid = true;

        if(user.ime == undefined || user.ime == '') {
            document.getElementById('imeTextbox').classList.add('is-invalid');
            document.getElementById('imeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('imeTextbox').classList.remove('is-invalid');
            document.getElementById('imeError').classList.add('d-none');
        }

        if(user.prezime == undefined || user.prezime == '') {
            document.getElementById('prezimeTextbox').classList.add('is-invalid');
            document.getElementById('prezimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('prezimeTextbox').classList.remove('is-invalid');
            document.getElementById('prezimeError').classList.add('d-none');
        }

        if(user.email == undefined || user.email == '' || !this.validateEmail(user.email)) {
            document.getElementById('emailTextbox').classList.add('is-invalid');
            document.getElementById('emailError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('emailTextbox').classList.remove('is-invalid');
            document.getElementById('emailError').classList.add('d-none');
        }

        if(user.odjel == undefined) {
            document.getElementById('odjelDropbox').classList.add('is-invalid');
            document.getElementById('odjelError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('odjelDropbox').classList.remove('is-invalid');
            document.getElementById('odjelError').classList.add('d-none');
        }

        return valid;
    }

    //TODO
    validateSearch() {
        let valid = true;
        let searchMaricniBroj = (<HTMLInputElement>document.getElementById('jmbgSearch')).value;

        if(searchMaricniBroj.length < 13 || searchMaricniBroj.length > 13) {
            console.log('\n\nGREŠKA');
            valid = false;
        }

        return valid;
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }
}
