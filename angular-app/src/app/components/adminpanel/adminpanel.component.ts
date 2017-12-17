import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { PonudeService } from '../../services/ponude.service';

@Component({
    selector: 'app-adminpanel',
    templateUrl: './adminpanel.component.html',
    styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
    korisnici: Object;
    ponude: Object;
    naziv_ponudeNew: String;
    sifra_ponudeNew: String;
    klasa_ponudeNew: String;
    datum_od_ponudeNew: String;
    datum_do_ponudeNew: String;
    aktivna_ponudaNew: String;
    prijavljeni_korisnik: Object;

    constructor(private navhomeService: NavhomeService, private authService: AuthService, private ponudeService: PonudeService) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.prijavljeni_korisnik = profile.user;
        }, err => {
            return false;
        });

        this.navhomeService.getKorisnici().subscribe(korisnici => {
            this.korisnici = korisnici.data;
        });

        this.getAllPonude();
    }
    
    toggleAdministrator(e, id) {
        const korisnik = {
            _id: id,
            administrator: e
        }

        this.authService.changeAdminRolle(korisnik).subscribe(data => {
            //TODO
            //notification

            if(data.success) {
                console.log('OK');
            } else {
                console.log('Error');
            }
        });
    }

    toggleAktivan(e, id) {
        const korisnik = {
            _id: id,
            aktivan: e
        }

        this.authService.changeActivity(korisnik).subscribe(data => {
            //TODO
            //notification

            if(data.success) {
                console.log('OK');
            } else {
                console.log('Error');
            }
        });
    }

    onAddSubmit() {
        const novaPonuda = {
            naziv_ponude: this.naziv_ponudeNew,
            sifra_ponude: this.sifra_ponudeNew,
            klasa_ponude: this.klasa_ponudeNew,
            datum_od: this.datum_od_ponudeNew,
            datum_do: this.datum_do_ponudeNew,
            aktivna: this.aktivna_ponudaNew,
            kreirao: {
                _id: this.prijavljeni_korisnik['_id'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        //TODO
        // Validacija unesenih vrijednosti

        //Unos nove usluge
        this.ponudeService.dodajPonudu(novaPonuda).subscribe(data => {
            //TODO
            //notification

            if(data.success) {
                console.log('OK');
            } else {
                console.log('Error');
            }
        });

        this.getAllPonude();
    }

    onDeleteClick(id) {
        //TODO
        //tražiti povrdu

        const ponuda = {
            _id: id
        }

        //Unos nove usluge
        this.ponudeService.obrisiPonudu(ponuda).subscribe(data => {
            //TODO
            //notification

            if(data.success) {
                console.log('OK');
            } else {
                console.log('Error');
            }
        });

        this.getAllPonude();
    }

    toggleAktivnaPonuda(e, id) {
        const ponuda = {
            _id: id,
            aktivna: e
        }

        this.ponudeService.changeActivity(ponuda).subscribe(data => {
            //TODO
            //notification

            if(data.success) {
                console.log('OK');
            } else {
                console.log('Error');
            }
        });

        this.getAllPonude();
    }

    getAllPonude() {
        this.ponudeService.getPonude().subscribe(ponude => {
            this.ponude = ponude.data;
        });
    }
}
