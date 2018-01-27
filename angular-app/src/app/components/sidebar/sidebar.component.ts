import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    prijavljeni_korisnik: Object;

    constructor() { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));
    }

    akcijeKlik() {
        console.log('akcije klik');
    }

}
