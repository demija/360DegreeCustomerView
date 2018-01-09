import { Injectable, transition } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class ValidateService {

    constructor() { }

    validacijaLogina(korisnik) {
        let valid = true;

        document.getElementById('loginSpinner').classList.remove('invisible');

        if(korisnik.korisnicko_ime == undefined || korisnik.korisnicko_ime == '') {
            document.getElementById('korisnickoimeTextbox').classList.add('is-invalid');
            document.getElementById('korisnickoimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
            document.getElementById('korisnickoimeError').classList.add('d-none');
        }

        if(korisnik.lozinka == undefined || korisnik.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            document.getElementById('lozinkaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
            document.getElementById('lozinkaError').classList.add('d-none');
        }

        document.getElementById('loginSpinner').classList.add('invisible');

        return valid;
    }

    validacijaRegistracije(korisnik) {
        let valid = true;

        if(korisnik.id_uposlenika == undefined || korisnik.id_uposlenika == '') {
            document.getElementById('idUposlenikaTextbox').classList.add('is-invalid');
            document.getElementById('idUposlenikaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('idUposlenikaTextbox').classList.remove('is-invalid');
            document.getElementById('idUposlenikaError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.ime == undefined || korisnik.ime == '') {
            document.getElementById('imeTextbox').classList.add('is-invalid');
            document.getElementById('imeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('imeTextbox').classList.remove('is-invalid');
            document.getElementById('imeError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.prezime == undefined || korisnik.prezime == '') {
            document.getElementById('prezimeTextbox').classList.add('is-invalid');
            document.getElementById('prezimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('prezimeTextbox').classList.remove('is-invalid');
            document.getElementById('prezimeError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.email == undefined || korisnik.email == '' || !this.validacijaEmaila(korisnik.email)) {
            document.getElementById('emailTextbox').classList.add('is-invalid');
            document.getElementById('emailError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('emailTextbox').classList.remove('is-invalid');
            document.getElementById('emailError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.korisnicko_ime == undefined || korisnik.korisnicko_ime == '' || korisnik.korisnicko_ime.length < 5) {
            document.getElementById('korisnickoimeTextbox').classList.add('is-invalid');
            document.getElementById('korisnickoimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
            document.getElementById('korisnickoimeError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.lozinka == undefined || korisnik.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            document.getElementById('lozinkaError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
            document.getElementById('lozinkaError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.potvrdaLozinke == undefined || korisnik.potvrdaLozinke == '' || korisnik.potvrdaLozinke != korisnik.lozinka) {
            document.getElementById('potvrdaLozinkeTextbox').classList.add('is-invalid');
            document.getElementById('potvrdaLozinkeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('potvrdaLozinkeTextbox').classList.remove('is-invalid');
            document.getElementById('potvrdaLozinkeError').classList.add('d-none');
            //valid = true;
        }

        if(korisnik.odjel == undefined) {
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

    validateUpdate(korisnik) {
        let valid = true;

        if(korisnik.ime == undefined || korisnik.ime == '') {
            document.getElementById('imeTextbox').classList.add('is-invalid');
            document.getElementById('imeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('imeTextbox').classList.remove('is-invalid');
            document.getElementById('imeError').classList.add('d-none');
        }

        if(korisnik.prezime == undefined || korisnik.prezime == '') {
            document.getElementById('prezimeTextbox').classList.add('is-invalid');
            document.getElementById('prezimeError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('prezimeTextbox').classList.remove('is-invalid');
            document.getElementById('prezimeError').classList.add('d-none');
        }

        if(korisnik.email == undefined || korisnik.email == '' || !this.validacijaEmaila(korisnik.email)) {
            document.getElementById('emailTextbox').classList.add('is-invalid');
            document.getElementById('emailError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('emailTextbox').classList.remove('is-invalid');
            document.getElementById('emailError').classList.add('d-none');
        }

        if(korisnik.odjel == undefined) {
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
            valid = false;
        }

        return valid;
    }

    validacijaEmaila(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    pokreniSwal(title, text, type, confirmButtonText) {
        swal({
            title: title,
            text: text,
            type: type,
            confirmButtonText: confirmButtonText
        });
    }
}
