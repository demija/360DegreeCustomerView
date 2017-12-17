import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { AuthService } from '../../services/auth.service';

//

//

@Component({
    selector: 'app-adminpanel',
    templateUrl: './adminpanel.component.html',
    styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
    korisnici: Object;

    constructor(private navhomeService: NavhomeService, private authService: AuthService) { }

    ngOnInit() {
        this.navhomeService.getKorisnici().subscribe(korisnici => {
            this.korisnici = korisnici.data;
        });
    }

    toggleAdministrator(e, id) {
        const korisnik = {
            _id: id,
            administrator: e
        }

        this.authService.changeAdminRolle(korisnik).subscribe(data => {
            

            if(data.success) {
                console.log('OK');
                /*swal({
                    type: 'info',
                    title: 'Dobro došli ' + data.user.ime + ' ' + data.user.prezime + '!',
                    showConfirmButton: false,
                    timer: 2000
                });*/
            } else {
                console.log('Error');
                /*swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });*/
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
                console.log('OK');
                /*swal({
                    type: 'info',
                    title: 'Dobro došli ' + data.user.ime + ' ' + data.user.prezime + '!',
                    showConfirmButton: false,
                    timer: 2000
                });*/
            } else {
                console.log('Error');
                /*swal({
                    title: 'Greška!',
                    text: data.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });*/
            }
        });
    }
}
