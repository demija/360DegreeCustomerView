import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { KlijentService } from '../../services/klijent.service';
import { KompanijaService } from '../../services/kompanija.service';
import { ValidateService } from '../../services/validate.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    appView = 'allClients';
    prijavljeni_korisnik: Object;
    klijenti: any;
    kompanije: any;

    // paging
    klijentiPage: number = 1;

    // novi klijent
    imeNew: String;
    prezimeNew: String;
    jmbgNew: String;
    broj_lkNew: String;
    datum_izdavanja_lkNew: any;
    datum_vazenja_lkNew: any;
    kucni_telNew: String;
    mobilni_telNew: String;
    ulica_i_brojNew: String = null;
    postanski_brojNew: String = null;
    gradNew: String = null;
    kantonNew: String = null;
    radni_statusNew: Boolean = false;
    id_firmeNew: String;
    naziv_firmeNew: String = null;
    odjel_firmeNew: String = null;
    saglasnost_za_crkNew: String;
    emailNew: String;

    // izmjena klijenta
    editKlijent: Object;
    id_firmeEdit: String;
    datum_izdavanja_lkEdit: any;
    datum_vazenja_lkEdit: any;

    // nova kompanija
    kompanijaNazivNew: String;
    kompanijaSifraNew: String;
    kompanijaTelNew: String;

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    constructor(
        private authService: AuthService,
        private klijentService: KlijentService,
        private kompanijaService: KompanijaService,
        private valdateService: ValidateService
    ) { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));
        this.vratiSveKlijente();
        this.vratiSveKompanije();
    }

    vratiSveKlijente() {
        this.klijentService.vratiSveKlijente().subscribe(klijenti => {
            this.klijenti = klijenti.data;
        });
    }

    vratiSveKompanije() {
        this.kompanijaService.vratiSveKompanije().subscribe(kompanije => {
            this.kompanije = kompanije.data;
        });
    }

    sviKlijenti() {
        this.vratiSveKlijente();
        this.appView = 'allClients';
    }

    noviKlijent() {
        this.appView = 'newClient';
    }

    editKlijenta(klijent) {
        this.editKlijent = klijent;
        this.id_firmeEdit = '0';

        this.kompanije.forEach(element => {
            if(this.editKlijent['firma_zaposlenja']._id == element._id) {
                this.id_firmeEdit = element._id;
            }
        });

        let datumIzdavanja = new Date(this.editKlijent['datum_izdavanja_lk']);
        let datumVazenja = new Date(this.editKlijent['datum_vazenja_lk']);

        this.datum_izdavanja_lkEdit = {
            date: { 
                year: datumIzdavanja.getFullYear(),
                month: datumIzdavanja.getMonth() + 1,
                day: datumIzdavanja.getDate()
            }
        };

        this.datum_vazenja_lkEdit = {
            date: { 
                year: datumVazenja.getFullYear(),
                month: datumVazenja.getMonth() + 1,
                day: datumVazenja.getDate()
            }
        };

        this.appView = 'editClient';
    }

    dodajKlijenta() {
        if(this.id_firmeNew == undefined || this.id_firmeNew == '0') {
            this.radni_statusNew = false;
            this.id_firmeNew = null;
            this.naziv_firmeNew = null;
            this.odjel_firmeNew = null;
        } else {
            this.kompanije.forEach(element => {
                if(element._id == this.id_firmeNew) {
                    this.radni_statusNew = true;
                    this.naziv_firmeNew = element.naziv;
                }
            });
        }

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
            radni_status: this.radni_statusNew,
            firma_zaposlenja: {
                _id: this.id_firmeNew,
                naziv: this.naziv_firmeNew,
                odjel: this.odjel_firmeNew
            },
            saglasnost_za_crk: this.saglasnost_za_crkNew,
            kreirao: {
                _id: this.prijavljeni_korisnik['_id'],
                id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
                ime: this.prijavljeni_korisnik['ime'],
                prezime: this.prijavljeni_korisnik['prezime'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }
        
        if(noviKlijent.datum_izdavanja_lk) {
            noviKlijent.datum_izdavanja_lk = noviKlijent.datum_izdavanja_lk.jsdate;
        }

        if(noviKlijent.datum_vazenja_lk) {
            noviKlijent.datum_vazenja_lk = noviKlijent.datum_vazenja_lk.jsdate;
        }

        // Validacija unesenih vrijednosti
        if(!this.valdateService.validacijaNoviKlijent(noviKlijent)) {
            return false;
        }

        // Matični broj constraint
        let postojiMaticnibroj = false;
        this.klijenti.forEach(element => {
            if(element.maticni_broj == this.jmbgNew) {
                this.valdateService.pokreniSwal('Greška!', 'Već postoji korisnik sa unesenim matičnim brojem', 'error', 'Uredu');
                postojiMaticnibroj = true;
            }
        });

        // Dodavanje korisnika
        if(!postojiMaticnibroj) {
            this.klijentService.addClient(noviKlijent).subscribe(data => {
                if(data.success) {
                    this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
                    this.vratiSveKlijente();
                    this.appView = 'allClients';
                } else {
                    this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
                }
            });
        }
    }

    sacuvajIzmjeneKlijenta(klijent) {
        let datumIzdavanjaTemp;
        let datumVazenjaTemp;

        if(this.datum_izdavanja_lkEdit && this.datum_izdavanja_lkEdit.date) {
            datumIzdavanjaTemp = new Date;
            datumIzdavanjaTemp.setDate(this.datum_izdavanja_lkEdit.date.day);
            datumIzdavanjaTemp.setMonth(this.datum_izdavanja_lkEdit.date.month-1);
            datumIzdavanjaTemp.setFullYear(this.datum_izdavanja_lkEdit.date.year);
            klijent.datum_izdavanja_lk = datumIzdavanjaTemp;
        } else {
            klijent.datum_izdavanja_lk = null;
        }

        if(this.datum_vazenja_lkEdit && this.datum_vazenja_lkEdit.date) {
            datumVazenjaTemp = new Date;
            datumVazenjaTemp.setDate(this.datum_vazenja_lkEdit.date.day);
            datumVazenjaTemp.setMonth(this.datum_vazenja_lkEdit.date.month-1);
            datumVazenjaTemp.setFullYear(this.datum_vazenja_lkEdit.date.year);
            klijent.datum_vazenja_lk = datumVazenjaTemp;
        } else {
            klijent.datum_vazenja_lk = null;
        }

        if(this.id_firmeEdit == undefined || this.id_firmeEdit == '0') {
            klijent.radni_status = false;
            klijent.firma_zaposlenja._id = null;
            klijent.firma_zaposlenja.naziv = null;
            klijent.firma_zaposlenja.odjel = null;
        } else {
            this.kompanije.forEach(element => {
                if(element._id == this.id_firmeEdit) {
                    klijent.radni_status = true;
                    klijent.firma_zaposlenja._id = element._id;
                    klijent.firma_zaposlenja.naziv = element.naziv;
                }
            });
        }

        klijent.izmjenio = {
            _id: this.prijavljeni_korisnik['_id'],
            id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
            ime: this.prijavljeni_korisnik['ime'],
            prezime: this.prijavljeni_korisnik['prezime'],
            korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
        }

        // Validacija unesenih vrijednosti
        if(!this.valdateService.validacijaIzmjeneKlijenta(klijent)) {
            return false;
        }

        // Sačuvaj izmjene klijenta
        this.klijentService.updateClient(klijent).subscribe(data => {
            if(data.success) {
                this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
                this.vratiSveKlijente();
                this.appView = 'allClients';
            } else {
                this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
    }

    novaKompanija() {
        const novaKompanija = {
            naziv: this.kompanijaNazivNew,
            sifra: this.kompanijaSifraNew,
            telefon: this.kompanijaTelNew,
            kreirao: {
                _id: this.prijavljeni_korisnik['_id'],
                id_uposlenika: this.prijavljeni_korisnik['id_uposlenika'],
                ime: this.prijavljeni_korisnik['ime'],
                prezime: this.prijavljeni_korisnik['prezime'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        // Validacija unesenih vrijednosti
        if(!this.valdateService.validacijaKompanije(novaKompanija)) {
            return false;
        }

        this.kompanijaService.novaKompanija(novaKompanija).subscribe(data => {
            if(data.success) {
                this.valdateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
                this.vratiSveKlijente();
                this.vratiSveKompanije();
            } else {
                this.valdateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
    }
}
