import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    klijent: Object;
    racuni: Object;
    depoziti: Object;
    kartice: Object;
    krediti: Object;
    imeNew: String;
    prezimeNew: String;
    jmbgNew: String;
    broj_lkNew: String;
    datum_izdavanja_lkNew: String;
    datum_vazenja_lkNew: String;
    kucni_telNew: String;
    mobilni_telNew: String;
    ulica_i_brojNew: String;
    postanski_brojNew: String;
    gradNew: String;
    kantonNew: String;
    bracno_stanjeNew: String;
    radni_statusNew: String;
    sifra_firmeNew: String;
    naziv_firmeNew: String;
    odjel_firmeNew: String;
    tel_firmeNew: String;
    saglasnost_za_crkNew: String;
    segment_klijentaNew: String;
    cb_klasifikacijaNew: String;
    emailNew: String;

    constructor(private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.navhomeService.currentKlijent.subscribe(klijent => {
            this.klijent = klijent;
        });

        this.navhomeService.currentRacun.subscribe(racuni => {
            this.racuni = racuni;
        });

        this.navhomeService.currentDepozit.subscribe(depoziti => {
            this.depoziti = depoziti;
        });

        this.navhomeService.currentKartica.subscribe(kartice => {
            this.kartice = kartice;
        });

        this.navhomeService.currentKredit.subscribe(krediti => {
            this.krediti = krediti;
        });
    }

    onEditSubmit() {
        //TODO
        //Validacija unesenih vrijednosti

        // Update korisnika
        this.navhomeService.updateClient(this.klijent).subscribe(data => {
            if(data.success) {
                swal({
                    type: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });
            }
        });
    }

    onAddSubmit() {
        const noviKlijent = {
            ime: this.imeNew,
            prezime: this.prezimeNew,
            maticni_broj: this.jmbgNew,
            broj_lk: this.broj_lkNew,
            datum_izdavanja_lk: this.datum_izdavanja_lkNew,
            datum_vazenja_lk: this.datum_vazenja_lkNew,
            mail_adresa: this.emailNew,
            kucni_telefon: this.kucni_telNew,
            mobilni_telefon: this.mobilni_telNew,
            adresa: {
                ulica_i_broj: this.ulica_i_brojNew,
                postanski_broj: this.postanski_brojNew,
                grad: this.gradNew,
                kanton: this.kantonNew
            },
            bracno_stanje: this.bracno_stanjeNew,
            radni_status: this.radni_statusNew,
            firma_zaposlenja: {
                sifra: this.sifra_firmeNew,
                naziv: this.naziv_firmeNew,
                odjel: this.odjel_firmeNew,
                telefon: this.tel_firmeNew
            },
            saglasnost_za_crk: this.saglasnost_za_crkNew,
            segment_klijenta: this.segment_klijentaNew,
            cb_klasifikacija: this.cb_klasifikacijaNew
        }

        //TODO
        // Validacija unesenih vrijednosti

        // Dodavanje korisnika
        this.navhomeService.addClient(noviKlijent).subscribe(data => {
            if(data.success) {
                swal({
                    //position: 'top-right',
                    type: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });
            }
        });
    }
}
