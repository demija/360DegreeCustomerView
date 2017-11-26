import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    klijent: Object;

    constructor(private navhomeService: NavhomeService) { }

    ngOnInit() {
        this.navhomeService.currentKlijent.subscribe(client => {
            this.klijent = client;
        });
    }
}
