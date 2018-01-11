import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { PonudeService } from '../../services/ponude.service';
import { BiljeskaService } from '../../services/biljeska.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    prijavljeni_korisnik: Object;

    klijent: Object;
    racuni: Object;
    depoziti: Object;
    kartice: Array<Object> = [];
    krediti: Object;
    biljeske: Object;
    ponude: any;
    time_line: Object;

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
    biljeskaTxt: String = "";
    biljeskaNaslov: String = "";
    biljeskaPrikaz: String = "";

    ponudjeneUsluge: Array<any> = [];
    ugovoreneUsluge: Array<any> = [];

    constructor(private authService: AuthService, private valdateService: ValidateService, private navhomeService: NavhomeService, private ponudeService: PonudeService, private biljeskaService: BiljeskaService) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.prijavljeni_korisnik = profile.user;
        }, err => {
            return false;
        });

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
            let karticeTmp = [];
            if(kartice['data']) {
                kartice['data'].forEach(elementKrt => {
                    elementKrt.kartica.forEach(element => {
                        element.racunUgovor = elementKrt.ugovor;
                        karticeTmp.push(element);
                    });
                });
            }

            this.kartice = karticeTmp;
        });

        this.navhomeService.currentKredit.subscribe(krediti => {
            this.krediti = krediti;
        });

        this.navhomeService.currentBiljeska.subscribe(bilj => {
            this.biljeske = bilj;
        });

        this.navhomeService.currentTimeline.subscribe(timeline => {
            if(Object.keys(timeline).length > 0) {
                this.time_line = timeline;
            }
        });

        this.ponudeService.getAktivnePonude().subscribe(ponude => {
            this.ponude = ponude.data;
        });
    }

    onEditSubmit() {
        //TODO
        //Validacija unesenih vrijednosti

        // Update korisnika
        this.navhomeService.updateClient(this.klijent).subscribe(data => {
            if(data.success) {
                this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
            } else {
                this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
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
                this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
            } else {
                this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
    }

    checkPonude(event, ponuda) {
        if(event.target.oldvalue){
            if(event.target.value == 'p') {
                this.ponudjeneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        this.ponudjeneUsluge.splice(this.ponudjeneUsluge.indexOf(element), 1);
                    }
                });
            } else if(event.target.value == 'u') {
                this.ugovoreneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        this.ugovoreneUsluge.splice(this.ugovoreneUsluge.indexOf(element), 1);
                    }
                });
            }

            event.target.checked = false;
        } else {
            if(event.target.value == 'p') {
                let contains = false;

                this.ponudjeneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        contains = true;
                    }
                });

                if(!contains) {
                    this.ponudjeneUsluge.push(ponuda);
                }

                this.ugovoreneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        this.ugovoreneUsluge.splice(this.ugovoreneUsluge.indexOf(element), 1);
                    }
                });
            } else if(event.target.value == 'u') {
                let contains = false;

                this.ugovoreneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        contains = true;
                    }
                });

                if(!contains) {
                    this.ugovoreneUsluge.push(ponuda);
                }

                this.ponudjeneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        this.ponudjeneUsluge.splice(this.ponudjeneUsluge.indexOf(element), 1);
                    }
                });
            }
        }
    }

    //TODO
    onCardClick() {        
        console.log('ponudjeno');
        this.ponudjeneUsluge.forEach(elementPonuda => {
            console.log(elementPonuda);
        });

        console.log('ugovoreno');
        this.ugovoreneUsluge.forEach(elementUgovor => {
            console.log(elementUgovor);
        });

        if(!this.klijent['_id']) {
            this.valdateService.pokreniSwal('Greška!', 'Odaberi klijenta', 'warning', 'Uredu');
        } else {
            if(this.ponudjeneUsluge.length == 0 && this.ugovoreneUsluge.length == 0) {
                this.valdateService.pokreniSwal('Greška!', 'Odaberi uslugu', 'warning', 'Uredu');
            } else {
                console.log('sve ok, spašavam usluge');
            }
        }
    }

    onBiljeskeSacuvajClick() {
        let bilj = {
            klijent: {
                _id: this.klijent['_id']
            },
            kreirao: {
                _id: this.prijavljeni_korisnik['_id'],
                id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
                ime: this.prijavljeni_korisnik['ime'],
                prezime: this.prijavljeni_korisnik['prezime'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime'],
            },
            poruka: this.biljeskaTxt.trim()
        }

        if(!this.klijent['_id']) {
            this.valdateService.pokreniSwal('Greška!', 'Odaberi klijenta', 'warning', 'Uredu');
        } else {
            if(bilj.poruka) {
                this.biljeskaService.dodaj(bilj).subscribe(data => {
                    if(data.success) {
                        this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
                        this.biljeskaTxt = "";
                    } else {
                        this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
                    }
                });
            } else {
                this.valdateService.pokreniSwal('Greška!', 'Unesi poruku', 'warning', 'Uredu');
            }
        }
    }

    showBiljeska(biljeska) {
        let datumBiljeske = new Date(biljeska.datum_kreiranja).getUTCDate() + "/" + new Date(biljeska.datum_kreiranja).getUTCMonth() + 1 + "/" + new Date(biljeska.datum_kreiranja).getUTCFullYear();

        this.biljeskaNaslov = biljeska.kreirao.ime + " " + biljeska.kreirao.prezime + " - " + datumBiljeske;
        this.biljeskaPrikaz = biljeska.poruka;
    }
}
