import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';
import { PonudeService } from '../../services/ponude.service';
import { ValidateService } from '../../services/validate.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-adminpanel',
    templateUrl: './adminpanel.component.html',
    styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
    korisnici: Object;
    ponude: any;
    naziv_ponudeNew: String;
    sifra_ponudeNew: String;
    klasa_ponudeNew: String;
    aktivna_ponudaNew: Boolean = true;
    prijavljeni_korisnik: Object;

    //
    id_ponudeEdit: String;
    naziv_ponudeEdit: String;
    sifra_ponudeEdit: String;
    klasa_ponudeEdit: String;
    datum_izmjeneEdit: Date;
    izmjenioEdit: Object;
    
    // paging
    ponudePage: number = 1;

    constructor(private navhomeService: NavhomeService, private authService: AuthService, private ponudeService: PonudeService, private valdateService: ValidateService) { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));

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
            if(data.success) {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        });
    }

    toggleAktivan(e, id) {
        const korisnik = {
            _id: id,
            aktivan: e
        }

        this.authService.changeActivity(korisnik).subscribe(data => {
            if(data.success) {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        });
    }

    onAddSubmit() {
        const novaPonuda = {
            naziv_ponude: this.naziv_ponudeNew,
            sifra_ponude: this.sifra_ponudeNew,
            klasa_ponude: this.klasa_ponudeNew,
            aktivna: this.aktivna_ponudaNew,
            kreirao: {
                _id: this.prijavljeni_korisnik['_id'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        // Validacija podataka nova ponude
        if(!this.valdateService.validacijaNovePonude(novaPonuda)) {
            return false;
        }

        //Unos nove usluge
        this.ponudeService.dodajPonudu(novaPonuda).subscribe(data => {
            if(data.success) {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        });

        this.getAllPonude();
    }

    onDeleteClick(id) {
        swal({
            title: 'Jeste li sigurni?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#149A80',
            cancelButtonColor: '#E12E1C',
            confirmButtonText: 'Da',
            cancelButtonText: 'Ne'
        }).then((result) => {
            if (result.value) {
                const ponuda = {
                    _id: id
                }
                
                this.ponudeService.obrisiPonudu(ponuda).subscribe(data => {
                    if(data.success) {
                        swal({
                            position: 'top-right',
                            //title: 'Greška!',
                            text: data.msg,
                            type: 'success',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    } else {
                        swal({
                            position: 'top-right',
                            //title: 'Greška!',
                            text: data.msg,
                            type: 'error',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                });
        
                this.getAllPonude();
            }
        });
    }

    onEditClick(id) {
        for(let p of this.ponude) {
            if(p['_id'] == id) {
                this.id_ponudeEdit = p._id;
                this.naziv_ponudeEdit = p.naziv_ponude;
                this.sifra_ponudeEdit = p.sifra_ponude;
                this.klasa_ponudeEdit = p.klasa_ponude;
            }
        }
    }

    onEditSubmit() {
        const ponudaEdit = {
            _id: this.id_ponudeEdit,
            naziv_ponude: this.naziv_ponudeEdit,
            sifra_ponude: this.sifra_ponudeEdit,
            klasa_ponude: this.klasa_ponudeEdit,
            izmjenio: {
                _id: this.prijavljeni_korisnik['_id'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        // Validacija podataka nova ponude
        if(!this.valdateService.validacijaIzmjenePonude(ponudaEdit)) {
            return false;
        }

        this.ponudeService.editPonudu(ponudaEdit).subscribe(data => {
            if(data.success) {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        });

        this.getAllPonude();
    }

    toggleAktivnaPonuda(e, id) {
        const ponuda = {
            _id: id,
            aktivna: e,
            izmjenio: {
                _id: this.prijavljeni_korisnik['_id'],
                korisnicko_ime: this.prijavljeni_korisnik['korisnicko_ime']
            }
        }

        this.ponudeService.changeActivity(ponuda).subscribe(data => {
            if(data.success) {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                swal({
                    position: 'top-right',
                    //title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2500
                });
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
