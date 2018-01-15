import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: Object;
    odjeliLista: any;
    
    // izmjena podataka
    imeEdit: String;
    prezimeEdit: String;
    emailEdit: String;
    id_odjelaEdit: String;
    odjelEdit: Object;

    // izmjena lozinke
    //trenutnaLozinkaEdit: String;
    novaLozinkaEdit: String = '';
    potvrdaNoveLozinkeEdit: String = '';
    
    constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.navhomeService.getOdjeli().subscribe(odjeli => {
            this.odjeliLista = odjeli.data;
        });
    }

    editProfila(user) {
        this.imeEdit = user.ime;
        this.prezimeEdit = user.prezime;
        this.emailEdit = user.email;
        this.id_odjelaEdit = user.odjel._id;
    }

    sacuvajIzmjene() {
        let org_jedinica = '';

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

        // Validacija unesenih vrijednosti
        if(!this.validateService.validacijaIzmjeneProfila(editProfile)) {
            return false;
        }

        // Update korisnika
        this.authService.izmjenaKorisnika(editProfile).subscribe(data => {
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

    izmjeniLozinku() {
        const korisnik = {
            _id: this.user['_id'],
            //trenutnaLozinka: this.trenutnaLozinkaEdit,
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
}
