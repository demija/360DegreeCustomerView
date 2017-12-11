import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';

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

    //
    //@Input() klijentEdit: Object;
    //

    constructor(private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.navhomeService.currentKlijent.subscribe(klijent => {
            this.klijent = klijent;

            //
            //this.klijentEdit = klijent;
            //
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
        console.log('poziv on submit');
        console.log(this.klijent);

        /*const klijent = {
            ime: this.ime_klijenta,
            prezime: this.prezime_klijenta,
            broj_lk: this.br_lk_klijenta,
            datum_izdavanja_lk: this.datum_izdavanja_lk_klijenta,
            datum_vazenja_lk: this.datum_vazenja_lk_klijenta,
            kucni_telefon: this.fiksniTel_klijenta,
            mobilni_telefon: this.mobilniTel_klijenta,
            ulica_i_broj: this.adresa_klijenta,
            postanski_broj: this.post_br_klijenta,
            grad: this.grad_klijenta,
            kanton: this.kanton_klijenta,
            bracno_stanje: this.bracno_stanje_klijenta,
            radni_status: this.radni_status_klijenta,
            naziv: this.firma_zaposlenja_klijenta,
            odjel: this.odjel_zaposlenja_klijenta,
            telefon: this.tel_zaposlenja_klijenta,
            saglasnost_za_crk: this.crk_saglasnost_klijenta,
            segment_klijenta: this.segment_klijenta,
            cb_klasifikacija: this.klasifikacija_klijenta,
            mail_adresa: this.email_klijenta,
        }*/

        // Validacija unesenih vrijednosti
        /*if(!this.validateService.validateRegister(user)) {
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
        });*/
    }
}
