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
    odjeliLista: Object;

    constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.navhomeService.getOdjeli().subscribe(odjeli => {
            this.odjeliLista = odjeli;
        });
    }

    /*onProfileSubmit() {
        // Validacija unesenih vrijednosti
        if(!this.validateService.validateUpdate(this.user)) {
            return false;
        }

        // Update korisnika
        this.authService.updateUser(this.user).subscribe(data => {
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
    }*/

    /*izmjenaKorisnika(user) {
        console.log(user);
    }*/
}
