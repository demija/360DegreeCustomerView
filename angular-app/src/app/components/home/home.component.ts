import { Component, OnInit } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    klijent: Object;
    racuni: Object;
    depoziti: Object;
    kartice: Object;
    krediti: Object;

    constructor(private navhomeService: NavhomeService) { }

    ngOnInit() {
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
            this.kartice = kartice;
        });

        this.navhomeService.currentKredit.subscribe(krediti => {
            this.krediti = krediti;
        });
    }
}
