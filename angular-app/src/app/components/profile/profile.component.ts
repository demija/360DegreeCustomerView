import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { ProfilService } from '../../services/profil.service';
import { KlijentPonudeService } from '../../services/klijent-ponude.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: Object;
    odjeliLista: any;
    poslovniceLista: any;
    brojPretraga: String;
    brojPonudjenihUsluga: Number;
    brojUgovorenihUsluga: Number;
    
    // izmjena podataka
    imeEdit: String;
    prezimeEdit: String;
    emailEdit: String;
    id_odjelaEdit: String;
    odjelEdit: Object;
    id_poslovniceEdit: String;
    prikaziPoslovnicu: Boolean = false;

    // izmjena lozinke
    novaLozinkaEdit: String = '';
    potvrdaNoveLozinkeEdit: String = '';
    
    constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private navhomeService: NavhomeService, private profilService: ProfilService, private klijentPonudeService: KlijentPonudeService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.navhomeService.getOdjeli().subscribe(odjeli => {
            this.odjeliLista = odjeli.data;
        });

        this.navhomeService.getPoslovnice().subscribe(data => {
            this.poslovniceLista = data.data;
        });

        this.profilService.brojPretraga(this.user).subscribe(broj_pretraga => {
            this.brojPretraga = broj_pretraga.data;
        });

        this.klijentPonudeService.ponudeKorisnika(this.user).subscribe(broj_ponuda => {
            this.brojPonudjenihUsluga = 0;
            this.brojUgovorenihUsluga = 0;

            let tempBrojPonuda = broj_ponuda.data;

            tempBrojPonuda.forEach(element => {
                this.brojPonudjenihUsluga += element.ponudjene_usluge.length;
                this.brojUgovorenihUsluga += element.ugovorene_usluge.length;
            });
        });
    }

    editProfila(user) {
        this.imeEdit = user.ime;
        this.prezimeEdit = user.prezime;
        this.emailEdit = user.email;
        this.id_odjelaEdit = user.odjel._id;

        if(user.odjel.organizaciona_jedinica == 'Sektor poslova sa stanovništvom') {
            this.id_poslovniceEdit = user.poslovnica._id;
            this.prikaziPoslovnicu = true;
        }
    }

    onOdjelChange() {
        let org_jedinica;
        this.odjeliLista.forEach(element => {
            if(element._id == this.id_odjelaEdit) {
                org_jedinica = element.organizaciona_jedinica;
            }
        });

        if(org_jedinica == 'Sektor poslova sa stanovništvom') {
            this.prikaziPoslovnicu = true;
        } else {
            this.prikaziPoslovnicu = false;
            this.id_poslovniceEdit = null;
        }
    }

    sacuvajIzmjene() {
        let org_jedinica = '';
        let poslovnica = {
            _id: null,
            naziv: ''
        };

        this.odjeliLista.forEach(element => {
            if(element._id == this.id_odjelaEdit) {
                org_jedinica = element.organizaciona_jedinica;
            }
        });

        const editProfile = {
            _id: this.user['_id'],
            ime: this.imeEdit,
            prezime: this.prezimeEdit,
            email: this.emailEdit,
            odjel: {
                _id: this.id_odjelaEdit,
                organizaciona_jedinica: org_jedinica
            }
        }

        if(this.id_poslovniceEdit) {
            this.poslovniceLista.forEach(element => {
                if(element._id == this.id_poslovniceEdit) {
                    poslovnica.naziv = element.naziv;
                }
            });

            poslovnica._id = this.id_poslovniceEdit;
            editProfile['poslovnica'] = poslovnica;
        } else {
            editProfile['poslovnica'] = null;
        }

        // Validacija unesenih vrijednosti
        if(!this.validateService.validacijaIzmjeneProfila(editProfile)) {
            return false;
        }

        // Update korisnika
        this.authService.izmjenaKorisnika(editProfile).subscribe(data => {
            if(data.success) {
                this.validateService.pokreniSwal(data.msg, '', 'success', 'Uredu');
            } else {
                this.validateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
    }

    izmjeniLozinku() {
        const korisnik = {
            _id: this.user['_id'],
            novaLozinka: this.novaLozinkaEdit,
            potvrdaNoveLozinke: this.potvrdaNoveLozinkeEdit
        }

        // Validacija unesenih vrijednosti
        if(!this.validateService.validacijaIzmjeneLozinke(korisnik)) {
            return false;
        }

        // Update korisnika
        this.authService.izmjenaLozinkeKorisnika(korisnik).subscribe(data => {
            if(data.success) {
                this.validateService.pokreniSwal(data.msg, '', 'succes', 'Uredu');
            } else {
                this.validateService.pokreniSwal('Greška!', data.msg, 'error', 'Uredu');
            }
        });
    }
}
