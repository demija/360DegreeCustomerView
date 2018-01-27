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
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
        }

        if(korisnik.lozinka == undefined || korisnik.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
        }

        document.getElementById('loginSpinner').classList.add('invisible');

        return valid;
    }

    validacijaRegistracije(korisnik) {
        let valid = true;

        if(korisnik.id_uposlenika == undefined || korisnik.id_uposlenika == '') {
            document.getElementById('idUposlenikaTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('idUposlenikaTextbox').classList.remove('is-invalid');
        }

        if(korisnik.ime == undefined || korisnik.ime == '') {
            document.getElementById('imeTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('imeTextbox').classList.remove('is-invalid');
        }

        if(korisnik.prezime == undefined || korisnik.prezime == '') {
            document.getElementById('prezimeTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('prezimeTextbox').classList.remove('is-invalid');
        }

        if(korisnik.email == undefined || korisnik.email == '' || !this.validacijaEmaila(korisnik.email)) {
            document.getElementById('emailTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('emailTextbox').classList.remove('is-invalid');
        }

        if(korisnik.korisnicko_ime == undefined || korisnik.korisnicko_ime == '' || korisnik.korisnicko_ime.length < 5) {
            document.getElementById('korisnickoimeTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('korisnickoimeTextbox').classList.remove('is-invalid');
        }

        if(korisnik.lozinka == undefined || korisnik.lozinka == '') {
            document.getElementById('lozinkaTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('lozinkaTextbox').classList.remove('is-invalid');
        }

        if(korisnik.potvrdaLozinke == undefined || korisnik.potvrdaLozinke == '' || korisnik.potvrdaLozinke != korisnik.lozinka) {
            document.getElementById('potvrdaLozinkeTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('potvrdaLozinkeTextbox').classList.remove('is-invalid');
        }

        if(korisnik.odjel == undefined) {
            document.getElementById('odjelDropbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('odjelDropbox').classList.remove('is-invalid');

            if(korisnik.odjel.organizaciona_jedinica == 'Sektor poslova sa stanovništvom' && !korisnik.poslovnica) {
                document.getElementById('poslovnicaDropbox').classList.add('is-invalid');
                valid = false;
            } else if(korisnik.odjel.organizaciona_jedinica == 'Sektor poslova sa stanovništvom' && korisnik.poslovnica) {
                document.getElementById('poslovnicaDropbox').classList.remove('is-invalid');
            }
        }

        return valid;
    }

    validacijaNoviKlijent(klijent) {
        let valid = true;

        if(klijent.ime == undefined || klijent.ime == '') {
            document.getElementById('imeNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('imeNewTextbox').classList.remove('is-invalid');
        }

        if(klijent.prezime == undefined || klijent.prezime == '') {
            document.getElementById('prezimeNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('prezimeNewTextbox').classList.remove('is-invalid');
        }

        if(klijent.maticni_broj == undefined || klijent.maticni_broj.length != 13 || isNaN(klijent.maticni_broj)) {
            document.getElementById('jmbgNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('jmbgNewTextbox').classList.remove('is-invalid');
        }

        if(klijent.broj_lk == undefined || klijent.broj_lk.length != 9) {
            document.getElementById('broj_lkNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('broj_lkNewTextbox').classList.remove('is-invalid');
        }

        if(!klijent.datum_izdavanja_lk) {
            document.getElementById('datum_izdavanja_lkNewError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('datum_izdavanja_lkNewError').classList.add('d-none');
        }

        if(!klijent.datum_vazenja_lk) {
            document.getElementById('datum_vazenja_lkNewError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('datum_vazenja_lkNewError').classList.add('d-none');
        }

        return valid;
    }

    validacijaIzmjeneKlijenta(klijent) {
        let valid = true;

        if(klijent.ime == undefined || klijent.ime == '') {
            document.getElementById('imeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('imeEditTextbox').classList.remove('is-invalid');
        }

        if(klijent.prezime == undefined || klijent.prezime == '') {
            document.getElementById('prezimeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('prezimeEditTextbox').classList.remove('is-invalid');
        }

        if(klijent.maticni_broj == undefined || klijent.maticni_broj.length != 13) {
            document.getElementById('jmbgEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('jmbgEditTextbox').classList.remove('is-invalid');
        }

        if(klijent.broj_lk == undefined || klijent.broj_lk.length != 9) {
            document.getElementById('broj_lkEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('broj_lkEditTextbox').classList.remove('is-invalid');
        }

        if(klijent.datum_izdavanja_lk == undefined || klijent.datum_izdavanja_lk == '') {
            document.getElementById('datum_izdavanja_lkEditError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('datum_izdavanja_lkEditError').classList.add('d-none');
        }

        if(klijent.datum_vazenja_lk == undefined || klijent.datum_vazenja_lk == '') {
            document.getElementById('datum_vazenja_lkEditError').classList.remove('d-none');
            valid = false;
        } else {
            document.getElementById('datum_vazenja_lkEditError').classList.add('d-none');
        }

        return valid;
    }

    validacijaIzmjeneProfila(korisnik) {
        let valid = true;

        if(korisnik.ime == undefined || korisnik.ime == '') {
            document.getElementById('imeProfilEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('imeProfilEditTextbox').classList.remove('is-invalid');
        }

        if(korisnik.prezime == undefined || korisnik.prezime == '') {
            document.getElementById('prezimeProfilEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('prezimeProfilEditTextbox').classList.remove('is-invalid');
        }

        if(korisnik.email == undefined || korisnik.email == '' || !this.validacijaEmaila(korisnik.email)) {
            document.getElementById('emailProfilEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('emailProfilEditTextbox').classList.remove('is-invalid');
        }

        if(korisnik.odjel == undefined) {
            document.getElementById('odjelProfilEdit').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('odjelProfilEdit').classList.remove('is-invalid');

            if(korisnik.odjel.organizaciona_jedinica == 'Sektor poslova sa stanovništvom' && !korisnik.poslovnica) {
                document.getElementById('poslovnicaEditDropbox').classList.add('is-invalid');
                valid = false;
            } else if(korisnik.odjel.organizaciona_jedinica == 'Sektor poslova sa stanovništvom' && korisnik.poslovnica) {
                document.getElementById('poslovnicaEditDropbox').classList.remove('is-invalid');
            }
        }

        return valid;
    }

    validacijaIzmjeneLozinke(lozinke) {
        let valid = true;

        /*if(lozinke.trenutnaLozinka == undefined || lozinke.trenutnaLozinka == '') {
            document.getElementById('trenutnaLozinkaEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('trenutnaLozinkaEditTextbox').classList.remove('is-invalid');
        }*/

        if(lozinke.novaLozinka == undefined || lozinke.novaLozinka == '') {
            document.getElementById('novaLozinkaEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('novaLozinkaEditTextbox').classList.remove('is-invalid');
        }

        if(lozinke.potvrdaNoveLozinke == undefined || lozinke.potvrdaNoveLozinke == '' || lozinke.potvrdaNoveLozinke != lozinke.novaLozinka) {
            document.getElementById('potvrdaNoveLozinkeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('potvrdaNoveLozinkeEditTextbox').classList.remove('is-invalid');
        }

        return valid;
    }

    validacijaKompanije(kompanija) {
        let valid = true;

        if(kompanija.naziv == undefined || kompanija.naziv == '') {
            document.getElementById('kompanijaNazivNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('kompanijaNazivNewTextbox').classList.remove('is-invalid');
        }

        return valid;
    }

    validacijaNovePonude(ponuda) {
        let valid = true;

        if(ponuda.naziv_ponude == undefined || ponuda.naziv_ponude == '') {
            document.getElementById('naziv_ponudeNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('naziv_ponudeNewTextbox').classList.remove('is-invalid');
        }

        if(ponuda.sifra_ponude == undefined || ponuda.sifra_ponude == '') {
            document.getElementById('sifra_ponudeNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('sifra_ponudeNewTextbox').classList.remove('is-invalid');
        }

        if(ponuda.klasa_ponude == undefined || ponuda.klasa_ponude == '') {
            document.getElementById('klasa_ponudeNewTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('klasa_ponudeNewTextbox').classList.remove('is-invalid');
        }

        return valid;
    }

    validacijaIzmjenePonude(ponuda) {
        let valid = true;

        if(ponuda.naziv_ponude == undefined || ponuda.naziv_ponude == '') {
            document.getElementById('naziv_ponudeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('naziv_ponudeEditTextbox').classList.remove('is-invalid');
        }

        if(ponuda.sifra_ponude == undefined || ponuda.sifra_ponude == '') {
            document.getElementById('sifra_ponudeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('sifra_ponudeEditTextbox').classList.remove('is-invalid');
        }

        if(ponuda.klasa_ponude == undefined || ponuda.klasa_ponude == '') {
            document.getElementById('klasa_ponudeEditTextbox').classList.add('is-invalid');
            valid = false;
        } else {
            document.getElementById('klasa_ponudeEditTextbox').classList.remove('is-invalid');
        }

        return valid;
    }

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
            position: 'top-right',
            title: title,
            text: text,
            type: type,
            confirmButtonText: confirmButtonText,
            confirmButtonColor: '#149A80'
        });
    }

    pokreniSwalUpit(title, type) {
        return swal({
            title: title,
            type: type,
            showCancelButton: true,
            confirmButtonColor: '#149A80',
            cancelButtonColor: '#E12E1C',
            confirmButtonText: 'Da',
            cancelButtonText: 'Ne'
        });
    }
}
