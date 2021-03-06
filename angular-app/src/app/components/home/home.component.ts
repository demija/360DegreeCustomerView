import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { PonudeService } from '../../services/ponude.service';
import { BiljeskaService } from '../../services/biljeska.service';
import { KlijentPonudeService } from '../../services/klijent-ponude.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // paging
    biljeskePage: number = 1;
    arhivaPonudaPage: number = 1;

    prijavljeni_korisnik: Object;
    ponudjeneUsluge: Array<any> = [];
    ugovoreneUsluge: Array<any> = [];

    klijent: Object;
    racuni: Object;
    depoziti: Object;
    kartice: Array<Object> = [];
    krediti: Object;
    biljeske: Object;
    dodatne_usluge: Array<Object> = [];
    arhivaPonuda: any;
    aktivnePonude: any;
    preporucenePonude: any;
    preporucene_ponude: any = [];
    time_line: Object;

    // biljeske
    biljeskaTxt: String = "";
    biljeskaNaslov: String = "";
    biljeskaPrikaz: String = "";

    // arhiva ponuda
    arhivaPonudaTxt: String = "";
    arivaPonudaNaslov: String = "";
    arhivaPonudaPonudjeneUsluge: String = "";
    arhivaPonudaUgovoreneUsluge: String = "";

    constructor(
        private authService: AuthService,
        private valdateService: ValidateService,
        private navhomeService: NavhomeService,
        private ponudeService: PonudeService,
        private biljeskaService: BiljeskaService,
        private klijentPonudeService: KlijentPonudeService
    ) { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));

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

        this.navhomeService.currentDodatnaUsluga.subscribe(dodatne_usluge => {
            this.dodatne_usluge = [];
            let tempDodatneUsluge = dodatne_usluge['data'];

            if(tempDodatneUsluge && tempDodatneUsluge.length > 0) {
                tempDodatneUsluge[0]['dodatne_usluge'].forEach(element => {
                    this.dodatne_usluge.push(element);
                });
            } else {
                this.dodatne_usluge = [];
            }
        });

        this.navhomeService.currentArhivaPonuda.subscribe(arhiva_ponuda => {
            this.arhivaPonuda = arhiva_ponuda;
        });

        this.navhomeService.currentAktivnaPonuda.subscribe(aktivne_ponude => {
            this.aktivnePonude = aktivne_ponude;
        });

        this.navhomeService.currentPreporucenaPonuda.subscribe(preporucene_ponude => {
            this.preporucenePonude = preporucene_ponude;
            this.preporucene_ponude = [];

            if(this.preporucenePonude['data']) {
                this.preporucenePonude['data'].forEach(element => {
                    this.aktivnePonude['data'].forEach(elementAktivnePonude => {
                        if(element[0] == elementAktivnePonude.naziv_ponude) {
                            this.preporucene_ponude.push(elementAktivnePonude);
                        }
                    });
                });
            }
        });

        this.navhomeService.currentTimeline.subscribe(timeline => {
            if(Object.keys(timeline).length > 0) {
                this.time_line = timeline;
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
                    let tempPonuda = {
                        _id: ponuda._id,
                        naziv_ponude: ponuda.naziv_ponude,
                        sifra_ponude: ponuda.sifra_ponude,
                        klasa_ponude: ponuda.klasa_ponude
                    }

                    this.ponudjeneUsluge.push(tempPonuda);
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
                    let tempPonuda = {
                        _id: ponuda._id,
                        naziv_ponude: ponuda.naziv_ponude,
                        sifra_ponude: ponuda.sifra_ponude,
                        klasa_ponude: ponuda.klasa_ponude
                    }
                    
                    this.ugovoreneUsluge.push(tempPonuda);
                }

                this.ponudjeneUsluge.forEach(element => {
                    if(element._id == ponuda._id) {
                        this.ponudjeneUsluge.splice(this.ponudjeneUsluge.indexOf(element), 1);
                    }
                });
            }
        }
    }

    onCardClick() {        
        if(!this.klijent['_id']) {
            this.valdateService.pokreniSwal('Greška!', 'Potrebno je odabrati klijenta', 'warning', 'Uredu');
            return false;
        }

        if(this.ponudjeneUsluge.length == 0 && this.ugovoreneUsluge.length == 0) {
            this.valdateService.pokreniSwal('Greška!', 'Potrebno je odabrati uslugu', 'warning', 'Uredu');
            return false;
        }

        const ponuda = {
            klijent: {
                _id: this.klijent['_id'],
                maticni_broj: this.klijent['maticni_broj'],
                ime: this.klijent['ime'],
                prezime: this.klijent['prezime']
            },
            ponudjene_usluge: this.ponudjeneUsluge,
            ugovorene_usluge: this.ugovoreneUsluge,
            evidentirao: {
                _id: this.prijavljeni_korisnik['_id'],
                id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
                ime: this.prijavljeni_korisnik['ime'],
                prezime: this.prijavljeni_korisnik['prezime'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        this.klijentPonudeService.novaKlijentPonuda(ponuda).subscribe(data => {
            if(data.success) {
                this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
            } else {
                this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
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
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            },
            poruka: this.biljeskaTxt.trim()
        }

        if(!this.klijent['_id']) {
            this.valdateService.pokreniSwal('Greška!', 'Potrebno je odabrati klijenta', 'warning', 'Uredu');
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
                this.valdateService.pokreniSwal('Greška!', 'Potrebno je unijeti poruku', 'warning', 'Uredu');
            }
        }
    }

    showBiljeska(biljeska) {
        let datumBiljeske = new Date(biljeska.datum_kreiranja).getUTCDate() + "/" + new Date(biljeska.datum_kreiranja).getUTCMonth() + 1 + "/" + new Date(biljeska.datum_kreiranja).getUTCFullYear();

        this.biljeskaNaslov = biljeska.kreirao.ime + " " + biljeska.kreirao.prezime + " - " + datumBiljeske;
        this.biljeskaPrikaz = biljeska.poruka;
    }

    showArhiva(arhiva) {
        let datumArhive = new Date(arhiva.datum_evidentiranja).getUTCDate() + "/" + new Date(arhiva.datum_evidentiranja).getUTCMonth() + 1 + "/" + new Date(arhiva.datum_evidentiranja).getUTCFullYear();

        this.arivaPonudaNaslov = arhiva.evidentirao.ime + " " + arhiva.evidentirao.prezime + " - " + datumArhive;
        this.arhivaPonudaPonudjeneUsluge = "Ponuđene usluge: ";

        arhiva.ponudjene_usluge.forEach(element => {
            this.arhivaPonudaPonudjeneUsluge = this.arhivaPonudaPonudjeneUsluge + " " + element.naziv_ponude + ", "
        });

        this.arhivaPonudaUgovoreneUsluge =  "Ugovorene usluge: ";

        arhiva.ugovorene_usluge.forEach(element => {
            this.arhivaPonudaUgovoreneUsluge = this.arhivaPonudaUgovoreneUsluge + " " + element.naziv_ponude + ", "
        });
    }
}
