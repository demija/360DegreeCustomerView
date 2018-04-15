import { Component, OnInit, transition } from '@angular/core';
import { NavhomeService } from '../../services/navhome.service';
import { ValidateService } from '../../services/validate.service';
import { KlijentService } from '../../services/klijent.service';
import { DepozitService } from '../../services/depozit.service';
import { KreditService } from '../../services/kredit.service';
import { RacunService } from '../../services/racun.service';
import { KlijentPonudeService } from '../../services/klijent-ponude.service';
import { BiljeskaService } from '../../services/biljeska.service';
import { IMyDpOptions } from 'mydatepicker';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    prijavljeni_korisnik: Object;

    // paging
    racuniPage: number = 1;
    karticePage: number = 1;
    kreditiPage: number = 1;
    depozitiPage: number = 1;
    labela: String = "računa";

    // računi
    tipoviUgovoraRacuna: any;
    selectedSviUgovoriRacuna: any;
    racuniResult: any[];
    selektovaniTipoviUgovoraRacuna: Array<Object> = [];
    datumOdRacun: Date;
    datumDoRacun: Date;
    // kartice
    tipoviUgovoraKartica: any;
    tipoviKartica: any;
    vrsteKartica: any;
    tipKarticeRadio:any;
    vrstaKarticeRadio: any;
    selectedSviUgovoriKartica: any;
    selectedSviTipoviKartica: any;
    selectedSveVrsteKartica: any;
    karticeResult: any;
    selektovaniTipoviUgovoraKartica: Array<Object> = [];
    datumOdKartica: Date;
    datumDoKartica: Date;
    // krediti
    tipoviUgovoraKredita: any;
    selectedSviUgovoriKredita: any;
    kreditiResult: any;
    selektovaniTipoviUgovoraKredita: Array<Object> = [];
    datumOdKredit: Date;
    datumDoKredit: Date;
    // depoziti
    tipoviDepozita: any;
    selectedAllDepozit: any;
    depozitiResult: any;
    selektovaniTipoviDepozita: Array<Object> = [];
    datumOdDepozit: Date;
    datumDoDepozit: Date;
    // pregled poslovanja
    brojKlijenata: any;
    poslovanjeKorisnik: any = [];
    pretrage: any;
    brojPretraga: any;
    ponude: any;
    ponudjeneUsluge: any;
    brojPonudjenihUsluga: any;
    ugovoreneUsluge: any;
    brojUgovorenihUsluga: any;
    biljeske: any;
    brojBiljeski: any;
    datumOdPoslovanje: Date;
    datumDoPoslovanje: Date;
    pretragaOdjeli: any = [];

    /*
    * GRAFOVI RAČUNA
    */
    periodRacunGrafa: Array<any> = [];
    // broj računa graf
    public racunBrojChartData:any[] = [{data: [], label: ''}];
    public racunBrojChartLabels:string[] = [];
    public racunBrojChartLegend:boolean = true;
    // računi
    public racunDoughnutChartData:number[] = [0];
    public racunDoughnutChartLabels:string[] = [];
    public racunDoughnutChartOptions:any = {
        title: {
            display: true,
            text: 'Tipovi računa'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        legend: {
            display: true,
            position: 'left',
            fullWidth: true
        }
    };

    /*
    * GRAFOVI KARTICA
    */
    periodKarticaGrafa: Array<any> = [];
    // broj kartica graf
    public karticaBrojChartData:any[] = [{data: [], label: ''}];
    public karticaBrojChartLabels:string[] = [];
    public karticaBrojChartLegend:boolean = true;

    /*
    * GRAFOVI KREDITA
    */
    periodKreditGrafa: Array<any> = [];
    // broj kredita graf
    public kreditBrojChartData:any[] = [{data: [], label: ''}];
    public kreditBrojChartLabels:string[] = [];
    public kreditBrojChartLegend:boolean = true;
    // kolicina kredita graf
    public kreditKolicinaChartData:any[] = [{data: [], label: ''}];
    public kreditKolicinaChartLabels:string[] = [];
    public kreditKolicinaChartLegend:boolean = true;
    // krediti
    public kreditDoughnutChartData:number[] = [];
    public kreditDoughnutChartLabels:string[] = [];
    public kreditDoughnutChartOptions:any = {
        title: {
            display: true,
            text: 'Tipovi kredita'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        legend: {
            display: true,
            position: 'left',
            fullWidth: true
        }
    };

    public kreditHorizontalBarChartData:any[] = [{data: [], label: ''}];
    public kreditHorizontalBarChartLabels:string[] = [];

    /*
    * GRAFOVI DEPOZITA
    */
    periodDepozitGrafa: Array<any> = [];
    // broj depozita graf
    public depozitBrojChartData:any[] = [{data: [], label: ''}];
    public depozitBrojChartLabels:string[] = [];
    public depozitBrojChartLegend:boolean = true;
    // kolicina depozita graf
    public depozitKolicinaChartData:any[] = [{data: [], label: ''}];
    public depozitKolicinaChartLabels:string[] = [];
    public depozitKolicinaChartLegend:boolean = true;
    // depoziti
    public depozitDoughnutChartData:number[] = [];
    public depozitDoughnutChartLabels:string[] = [];
    public depozitDoughnutChartOptions:any = {
        title: {
            display: true,
            text: 'Depoziti'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        legend: {
            display: true,
            position: 'left',
            fullWidth: true
        }
    }

    public depozitHorizontalBarChartData:any[] = [{data: [], label: ''}];
    public depozitHorizontalBarChartLabels:string[] = [];

    /*
    * GRAFOVI UNIVERZALNA KONFIGURACIJA
    */
    public lineChartType:string = 'line';
    public lineBrojChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        title: {
            display: true,
            text: 'Broj potpisanih ugovora'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Odabrani period'
                    }
                }],
            yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Broj potpisanih ugovora'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5
                    }
                }]
        },
        legend: {
            display: true,
            position: 'left',
            fullWidth: false
        },
        elements: {
            line: {
                    fill: true
            }
        }
    };

    public lineKolicinaChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        //maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Iznos ugovora po periodu'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Odabrani period'
                    }
                }],
            yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'BAM'
                    },
                    ticks: {
                        beginAtZero: true,
                    }
                }]
        },
        legend: {
            display: true,
            position: 'left',
            fullWidth: true
        },
        elements: {
            line: {
                    fill: true
            }
        }
    };

    public pieChartType:string = 'pie';

    public horizontalBarChartType:string = 'horizontalBar';
    public horizontalBarChartLegend:boolean = false;
    public horizontalBarChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        title: {
            display: true,
            text: 'Ukupni iznos ugovora'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 50,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'BAM'
                    }
                }],
            yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Tipovi ugovora'
                    }
                }]
        }
    };

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };

    constructor(
        private navhomeService: NavhomeService,
        private validateService: ValidateService,
        private depozitService: DepozitService,
        private kreditService: KreditService,
        private racunService: RacunService,
        private klijentPonudeService: KlijentPonudeService,
        private biljeskaService: BiljeskaService,
        private klijentService: KlijentService
    ) { }

    ngOnInit() {
        this.prijavljeni_korisnik = JSON.parse(localStorage.getItem('user'));

        // Računi
        this.racunService.tipoviUgovora().subscribe(tipoviUgovora => {
            this.tipoviUgovoraRacuna = tipoviUgovora.data;
        });

        // Kartice
        this.racunService.tipoviUgovoraKartica().subscribe(tipoviUgovora => {
            let tempTipovi = [];
            let sadrzi;
            
            tipoviUgovora.data.forEach(elementTipUgovora => {
                elementTipUgovora._id.kartica.forEach(element => {
                    sadrzi = false;
                    
                    tempTipovi.forEach(elementTemp => {
                        if(elementTemp.tip_ugovora == element.tip_ugovora) {
                            sadrzi = true;
                        }
                    });

                    if(!sadrzi) {
                        tempTipovi.push(element);
                    }
                });
            });

            this.tipoviUgovoraKartica = tempTipovi;
        });

        this.racunService.tipoviKartica().subscribe(tipoviKartica => {
            let tempTipovi = [];
            
            tipoviKartica.data.forEach(elementTipUgovora => {
                elementTipUgovora._id.tip_kartice.forEach(element => {
                    if(tempTipovi.indexOf(element) == -1) {
                        tempTipovi.push(element);
                    }
                });
            });

            this.tipoviKartica = tempTipovi;
        });

        this.racunService.vrsteKartica().subscribe(vrsteKartica => {
            let tempTipovi = [];
            
            vrsteKartica.data.forEach(elementTipUgovora => {
                elementTipUgovora._id.vrsta_kartice.forEach(element => {
                    if(tempTipovi.indexOf(element) == -1) {
                        tempTipovi.push(element);
                    }
                });
            });

            this.vrsteKartica = tempTipovi;
        });
        
        // Krediti
        this.kreditService.tipoviUgovora().subscribe(tipoviKredita => {
            this.tipoviUgovoraKredita = tipoviKredita.data;
        });

        // Depoziti
        this.depozitService.vratiSveTipove().subscribe(tipoviDepozita => {
            this.tipoviDepozita = tipoviDepozita.data;
        });
    }

    /*
    *   RAČUNI - metode
    */
    selektujSveTipoveUgovoraRacuna() {
        this.tipoviUgovoraRacuna.forEach(element => {
            element.selected = this.selectedSviUgovoriRacuna;
        });
    }

    selektujTipUgovoraRacuna() {
        this.selectedSviUgovoriRacuna = this.tipoviUgovoraRacuna.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziRacune() {
        this.resetRacunGrafova();
        this.selektovaniTipoviUgovoraRacuna = [];

        this.tipoviUgovoraRacuna.forEach(element => {
            if(element.selected) {
                this.selektovaniTipoviUgovoraRacuna.push(element['_id']['tip_ugovora']);
            }
        });

        if(this.selektovaniTipoviUgovoraRacuna.length > 0) {
            this.pripremaRacunGrafova();
            
            let search = {
                tip_ugovora: this.selektovaniTipoviUgovoraRacuna,
                datum_od: null,
                datum_do: null
            }

            if(this.datumOdRacun) {
                search.datum_od = this.datumOdRacun['jsdate'];
            }

            if(this.datumDoRacun) {
                search.datum_do = this.datumDoRacun['jsdate'];
            }

            this.racunService.pretraga(search).subscribe(racuni => {
                if(racuni.success) {
                    this.racuniResult = racuni.data;

                    this.generisanjePeriodaRacunGrafa();
                    this.generisanjeBrojRacunaGrafa();
                    this.generisanjeGrafaRacuna();
                } else {
                    this.validateService.pokreniSwal('Greška!', racuni.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.validateService.pokreniSwal('Greška!', "Odaberi tip ugovora!", 'warning', 'Uredu');
        }
    }

    resetRacunGrafova() {
        // Reset chart labela
        this.racunBrojChartLabels = [];

        // Reset chart vrijednosti
        this.racunBrojChartData.length = 1;

        this.racunDoughnutChartData.forEach(element => {
            element = 0;
        });

        this.racunDoughnutChartLabels = [];
        this.tipoviUgovoraRacuna.forEach(element => {
            this.racunDoughnutChartLabels.push(element._id.opis_tipa_ugovora);
        });
    }

    pripremaRacunGrafova() {
        while(this.racunBrojChartData.length < this.selektovaniTipoviUgovoraRacuna.length) {
            this.racunBrojChartData.push({ data: [], label: "" });
        }
    }

    generisanjePeriodaRacunGrafa() {
        this.periodRacunGrafa = [];
        this.periodRacunGrafa.push({
            mjesec: new Date(this.racuniResult[0].datum_ugovora).getMonth() + 1,
            godina: new Date(this.racuniResult[0].datum_ugovora).getFullYear(),
        });

        // get period
        this.racuniResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.datum_ugovora);

            this.periodRacunGrafa.forEach(element => {
                if(element.mjesec == tempDate.getMonth() + 1) {
                    if(element.godina == tempDate.getFullYear()) {
                        dodaj = false;
                    }
                }
            });

            if(dodaj) {
                let tempDatum = {
                    mjesec: new Date(tempDate).getMonth() + 1,
                    godina: new Date(tempDate).getFullYear(),
                }

                this.periodRacunGrafa.push(tempDatum);
            }
        });
        
        // postavljanje labele na chart
        this.periodRacunGrafa.forEach(element => {
            let datum = element.mjesec + '. mjesec ' + element.godina;
            this.racunBrojChartLabels.push(datum);
        });
    }

    generisanjeBrojRacunaGrafa() {
        let clone = JSON.parse(JSON.stringify(this.racunBrojChartData));

        for(let i = 0; i < this.selektovaniTipoviUgovoraRacuna.length; i++) {
            // računanje broja potpisanih ugovora po periodu
            let data = [];
            let labela = '';
            
            this.periodRacunGrafa.forEach(element => {
                let broj = 0;

                this.racuniResult.forEach(elementRacun => {
                    if(elementRacun.ugovor.tip_ugovora == this.selektovaniTipoviUgovoraRacuna[i]) {
                        labela = elementRacun.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementRacun.datum_ugovora);
                    
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            ++broj;
                        }
                    }
                });

                data.push(broj);
            });

            clone[i].data = data;
            clone[i].label = labela;
        };

        this.racunBrojChartData = clone;
    }

    generisanjeGrafaRacuna() {
        let doughnutVrijednosti = [];
        let vrijednosti = [];
        let tempVrijednost;

        //this.racunKolicinaChartData.forEach(element => {
        this.racunBrojChartData.forEach(element => {
            tempVrijednost = 0;

            if(element.label != '') {
                element.data.forEach(elementData => {
                    tempVrijednost += Number(elementData);
                });

                vrijednosti.push({
                    labela: element.label,
                    vrijednost: Number(tempVrijednost.toFixed(2))
                });
            }
        });

        this.tipoviUgovoraRacuna.forEach(element => {
            if(element.selected) {
                vrijednosti.forEach(elementVrijednosti => {
                    if(elementVrijednosti.labela == element._id.opis_tipa_ugovora) {
                        doughnutVrijednosti.push(elementVrijednosti.vrijednost);
                    }
                });
            } else {
                doughnutVrijednosti.push(0);
            }
        });

        this.racunDoughnutChartData = doughnutVrijednosti;
    }

    racuniCsv() {
        let data = [];
        let head = [
            'Ime',
            'Prezime',
            'Broj l.k.',
            'JMBG',
            'Tip ugovora',
            'Opis tipa ugovora',
            'Partija',
            'Konto',
            'Datum ugovora'
        ];

        this.racuniResult.forEach(element => {
            let obj = {
                ime_klijenta: element.klijent.ime,
                prezime_klijenta: element.klijent.prezime,
                lk_klijenta: element.klijent.broj_lk,
                jmbg_klijenta: element.klijent.maticni_broj,
                tip_ugovora: element.ugovor.tip_ugovora,
                opis_tipa_ugovora: element.ugovor.opis_tipa_ugovora,
                partija: element.ugovor.partija,
                konto: element.konto,
                datum_ugovora: element.datum_ugovora
            }

            data.push(obj);
        });
        
        new Angular2Csv(data, 'recuniReport', {headers: (head)});        
    }

    /*
    *   KARTICE - metode
    */
    selektujSveTipoveUgovoraKartica() {
        for (var i = 0; i < this.tipoviUgovoraKartica.length; i++) {
          this.tipoviUgovoraKartica[i].selected = this.selectedSviUgovoriKartica;
        }
    }

    selektujTipUgovoraKartice() {
        this.selectedSviUgovoriKartica = this.tipoviUgovoraKartica.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziKartice() {
        this.resetKarticaGrafova();
        this.selektovaniTipoviUgovoraKartica = [];

        for (var i = 0; i < this.tipoviUgovoraKartica.length; i++) {
            if(this.tipoviUgovoraKartica[i].selected) {
                this.selektovaniTipoviUgovoraKartica.push(this.tipoviUgovoraKartica[i]['tip_ugovora']);
            }
        }

        if(this.selektovaniTipoviUgovoraKartica.length > 0) {
            this.pripremaKarticaGrafova();
            
            let search = {
                tip_ugovora: this.selektovaniTipoviUgovoraKartica,
                tip_kartice: this.tipKarticeRadio,
                vrsta_kartice: this.vrstaKarticeRadio
            }

            this.racunService.pretragaKartica(search).subscribe(kartice => {
                if(kartice.success) {
                    let tempKarticeResult = [];
                    let datum;

                    kartice.data.forEach(elementData => {
                        elementData.kartica.forEach(element => {
                            let objekat = {
                                klijent: elementData.klijent,
                                ugovor: elementData.ugovor,
                                kartica: element
                            }

                            datum = new Date(objekat.kartica.datum_ugovora);

                            if(this.datumOdKartica && this.datumDoKartica) {
                                if(datum >= this.datumOdKartica['jsdate'] && datum <= this.datumDoKartica['jsdate']) {
                                    tempKarticeResult.push(objekat);
                                }
                            } else if(!this.datumOdKartica && !this.datumDoKartica) {
                                tempKarticeResult.push(objekat);
                            } else {
                                if(this.datumOdKartica) {
                                    if(datum >= this.datumOdKartica['jsdate']) {
                                        tempKarticeResult.push(objekat);
                                    }
                                }

                                if(this.datumDoKartica) {
                                    if(datum <= this.datumDoKartica['jsdate']) {
                                        tempKarticeResult.push(objekat);
                                    }
                                }
                            }
                        });
                    });

                    tempKarticeResult.sort((a, b) => new Date(a.kartica.datum_ugovora).getTime() - new Date(b.kartica.datum_ugovora).getTime());
                    this.karticeResult = tempKarticeResult;

                    this.generisanjePeriodaKarticaGrafa();
                    this.generisanjeBrojKarticaGrafa();
                } else {
                    this.validateService.pokreniSwal('Greška!', kartice.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.validateService.pokreniSwal('Greška!', "Odaberi tip ugovora!", 'warning', 'Uredu');
        }
    }

    resetKarticaGrafova() {
        // Reset chart labela
        this.karticaBrojChartLabels = [];

        // Reset chart vrijednosti
        this.karticaBrojChartData.length = 1;
    }

    pripremaKarticaGrafova() {
        while(this.karticaBrojChartData.length < this.selektovaniTipoviUgovoraKartica.length) {
            this.karticaBrojChartData.push({ data: [], label: "" });
        }
    }

    generisanjePeriodaKarticaGrafa() {
        this.periodKarticaGrafa = [];
        this.periodKarticaGrafa.push({
            mjesec: new Date(this.karticeResult[0].kartica.datum_ugovora).getMonth() + 1,
            godina: new Date(this.karticeResult[0].kartica.datum_ugovora).getFullYear(),
        });

        // get period
        this.karticeResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.kartica.datum_ugovora);

            this.periodKarticaGrafa.forEach(element => {
                if(element.mjesec == tempDate.getMonth() + 1) {
                    if(element.godina == tempDate.getFullYear()) {
                        dodaj = false;
                    }
                }
            });

            if(dodaj) {
                let tempDatum = {
                    mjesec: new Date(tempDate).getMonth() + 1,
                    godina: new Date(tempDate).getFullYear(),
                }

                this.periodKarticaGrafa.push(tempDatum);
            }
        });
        
        // postavljanje labele na chart
        this.periodKarticaGrafa.forEach(element => {
            let datum = element.mjesec + '. mjesec ' + element.godina;
            this.karticaBrojChartLabels.push(datum);
        });
    }

    generisanjeBrojKarticaGrafa() {
        let clone = JSON.parse(JSON.stringify(this.karticaBrojChartData));

        for(let i = 0; i < this.selektovaniTipoviUgovoraKartica.length; i++) {
            // računanje broja potpisanih ugovora po periodu
            let data = [];
            let labela = '';
            
            this.periodKarticaGrafa.forEach(element => {
                let broj = 0;

                this.karticeResult.forEach(elementKartica => {
                    if(elementKartica.kartica.ugovor.tip_ugovora == this.selektovaniTipoviUgovoraKartica[i]) {
                        labela = elementKartica.kartica.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementKartica.kartica.datum_ugovora);
                    
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            ++broj;
                        }
                    }
                });

                data.push(broj);
            });

            clone[i].data = data;
            clone[i].label = labela;
        };

        this.karticaBrojChartData = clone;
    }

    karticeCsv() {
        let data = [];
        let head = [
            'Ime',
            'Prezime',
            'Broj l.k.',
            'JMBG',
            'Tip ugovora',
            'Opis tipa ugovora',
            'Partija',
            'Tip kartice',
            'Vrsta kartice',
            'Datum ugovora',
            'Datum vazenja'
        ];

        this.karticeResult.forEach(element => {
            let obj = {
                ime_klijenta: element.klijent.ime,
                prezime_klijenta: element.klijent.prezime,
                lk_klijenta: element.klijent.broj_lk,
                jmbg_klijenta: element.klijent.maticni_broj,
                tip_ugovora: element.kartica.ugovor.tip_ugovora,
                opis_tipa_ugovora: element.kartica.ugovor.opis_tipa_ugovora,
                partija: element.ugovor.partija,
                tip_kartice: element.kartica.tip_kartice,
                vrsta_kartice: element.kartica.vrsta_kartice,
                datum_ugovora: element.kartica.datum_ugovora,
                datum_vazenja: element.kartica.datum_vazenja
            }

            data.push(obj);
        });
        
        new Angular2Csv(data, 'karticeReport', {headers: (head)});
    }

    /*
    *   KREDITI - metode
    */
    selektujSveTipoveUgovoraKredita() {
        this.tipoviUgovoraKredita.forEach(element => {
            element.selected = this.selectedSviUgovoriKredita;
        });
    }

    selektujTipUgovoraKredita() {
        this.selectedSviUgovoriKredita = this.tipoviUgovoraKredita.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziKredite() {
        this.resetKreditGrafova();
        this.selektovaniTipoviUgovoraKredita = [];

        this.tipoviUgovoraKredita.forEach(element => {
            if(element.selected) {
                this.selektovaniTipoviUgovoraKredita.push(element['_id']['tip_ugovora']);
            }
        });

        if(this.selektovaniTipoviUgovoraKredita.length > 0) {
            this.pripremaKreditGrafova();
            
            let search = {
                tip_ugovora: this.selektovaniTipoviUgovoraKredita,
                datum_od: null,
                datum_do: null
            }

            if(this.datumOdKredit) {
                search.datum_od = this.datumOdKredit['jsdate'];
            }

            if(this.datumDoKredit) {
                search.datum_do = this.datumDoKredit['jsdate'];
            }

            this.kreditService.pretraga(search).subscribe(krediti => {
                if(krediti.success) {
                    this.kreditiResult = krediti.data;

                    this.generisanjePeriodaKreditGrafa();
                    this.generisanjeBrojKreditaGrafa();
                    this.generisanjeKolicinaKreditaGrafa();
                    this.generisanjeGrafaKredita();
                } else {
                    this.validateService.pokreniSwal('Greška!', krediti.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.validateService.pokreniSwal('Greška!', "Odaberi tip ugovora!", 'warning', 'Uredu');
        }
    }

    resetKreditGrafova() {
        // Reset chart labela
        this.kreditBrojChartLabels = [];
        this.kreditKolicinaChartLabels = [];

        // Reset chart vrijednosti
        this.kreditBrojChartData.length = 1;
        this.kreditKolicinaChartData.length = 1;

        this.kreditDoughnutChartData.forEach(element => {
            element = null;
        });

        this.kreditDoughnutChartLabels = [];
        this.tipoviUgovoraKredita.forEach(element => {
            this.kreditDoughnutChartLabels.push(element._id.opis_tipa_ugovora);
        });
    }

    pripremaKreditGrafova() {
        while(this.kreditBrojChartData.length < this.selektovaniTipoviUgovoraKredita.length) {
            this.kreditBrojChartData.push({ data: [], label: "" });
        }

        while(this.kreditKolicinaChartData.length < this.selektovaniTipoviUgovoraKredita.length) {
            this.kreditKolicinaChartData.push({ data: [], label: "" });
        }
    }

    generisanjePeriodaKreditGrafa() {
        this.periodKreditGrafa = [];
        
        this.periodKreditGrafa.push({
            mjesec: new Date(this.kreditiResult[0].datum_ugovora).getMonth() + 1,
            godina: new Date(this.kreditiResult[0].datum_ugovora).getFullYear(),
        });

        // get period
        this.kreditiResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.datum_ugovora);

            this.periodKreditGrafa.forEach(element => {
                if(element.mjesec == tempDate.getMonth() + 1) {
                    if(element.godina == tempDate.getFullYear()) {
                        dodaj = false;
                    }
                }
            });

            if(dodaj) {
                let tempDatum = {
                    mjesec: new Date(tempDate).getMonth() + 1,
                    godina: new Date(tempDate).getFullYear(),
                }

                this.periodKreditGrafa.push(tempDatum);
            }
        });
        
        // postavljanje labele na chart
        this.periodKreditGrafa.forEach(element => {
            let datum = element.mjesec + '. mjesec ' + element.godina;
            this.kreditBrojChartLabels.push(datum);
            this.kreditKolicinaChartLabels.push(datum);
        });
    }

    generisanjeBrojKreditaGrafa() {
        let clone = JSON.parse(JSON.stringify(this.kreditBrojChartData));

        for(let i = 0; i < this.selektovaniTipoviUgovoraKredita.length; i++) {
            // računanje broja potpisanih ugovora po periodu
            let data = [];
            let labela = '';
            
            this.periodKreditGrafa.forEach(element => {
                let broj = 0;

                this.kreditiResult.forEach(elementKredit => {
                    if(elementKredit.ugovor.tip_ugovora == this.selektovaniTipoviUgovoraKredita[i]) {
                        labela = elementKredit.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementKredit.datum_ugovora);
                    
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            ++broj;
                        }
                    }
                });

                data.push(broj);
            });

            clone[i].data = data;
            clone[i].label = labela;
        };

        this.kreditBrojChartData = clone;
    }

    generisanjeKolicinaKreditaGrafa() {
        let clone = JSON.parse(JSON.stringify(this.kreditKolicinaChartData));

        for(let i = 0; i < this.selektovaniTipoviUgovoraKredita.length; i++) {
            // računanje iznosa potpisanih ugovora po periodu
            let data = [];
            let labela = '';

            this.periodKreditGrafa.forEach(element => {
                let broj = 0.00;

                this.kreditiResult.forEach(elementKredit => {
                    if(elementKredit.ugovor.tip_ugovora == this.selektovaniTipoviUgovoraKredita[i]) {
                        labela = elementKredit.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementKredit.datum_ugovora);
                        
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            broj += Number(elementKredit.odobreni_iznos);
                        }
                    }
                });

                data.push(broj.toFixed(2));
            });

            clone[i].data = data;
            clone[i].label = labela;
        }

        this.kreditKolicinaChartData = clone;
    }

    generisanjeGrafaKredita() {
        let labelaVrijednost = [];
        let doughnutVrijednosti = [];
        let vrijednosti = [];
        let horVrijednosti = [];
        let tempVrijednost;
        this.kreditHorizontalBarChartLabels = [];

        this.kreditKolicinaChartData.forEach(element => {
            tempVrijednost = 0;

            if(element.label != '') {
                element.data.forEach(elementData => {
                    tempVrijednost += Number(elementData);
                });

                vrijednosti.push({
                    labela: element.label,
                    vrijednost: Number(tempVrijednost.toFixed(2))
                });
            }
        });

        this.tipoviUgovoraKredita.forEach(element => {
            if(element.selected) {
                vrijednosti.forEach(elementVrijednosti => {
                    if(elementVrijednosti.labela == element._id.opis_tipa_ugovora) {
                        doughnutVrijednosti.push(elementVrijednosti.vrijednost);
                        labelaVrijednost.push({
                            labela: elementVrijednosti.labela,
                            vrijednost: elementVrijednosti.vrijednost
                        });
                    }
                });
            } else {
                doughnutVrijednosti.push(0);
            }
        });

        this.kreditDoughnutChartData = doughnutVrijednosti;
        
        labelaVrijednost.sort(function(a,b) {return (a.vrijednost > b.vrijednost) ? -1 : ((b.vrijednost > a.vrijednost) ? 1 : 0);} );
        labelaVrijednost.forEach(element => {
            this.kreditHorizontalBarChartLabels.push(element.labela);
            horVrijednosti.push(element.vrijednost);
        });

        this.kreditHorizontalBarChartData[0].data = horVrijednosti;
    }

    kreditiCsv() {
        let data = [];
        let head = [
            'Ime',
            'Prezime',
            'Broj l.k.',
            'JMBG',
            'Tip ugovora',
            'Opis tipa ugovora',
            'Partija',
            'Odobreni iznos',
            'Period otplate',
            'Stopa',
            'Mjesecna kamatna stopa',
            'Anuitet',
            'Ukupna kamatna stopa',
            'Ukupno placanje',
            'Datum ugovora',
            'Datum vazenja'
        ];

        this.kreditiResult.forEach(element => {
            let obj = {
                ime_klijenta: element.klijent.ime,
                prezime_klijenta: element.klijent.prezime,
                lk_klijenta: element.klijent.broj_lk,
                jmbg_klijenta: element.klijent.maticni_broj,
                tip_ugovora: element.ugovor.tip_ugovora,
                opis_tipa_ugovora: element.ugovor.opis_tipa_ugovora,
                partija: element.ugovor.partija,
                odobreni_iznos: element.odobreni_iznos,
                period_otplate: element.period_otplate,
                stopa: element.stopa,
                mjesecna_kamatna_stopa: element.mjesecna_kamatna_stopa,
                anuitet: element.iznos_anuitet,
                ukupna_kamatna_stopa: element.ukupna_kamatna_stopa,
                ukupno_placanje: element.ukupno_placanje,
                datum_ugovora: element.datum_ugovora,
                datum_vazenja: element.datum_vazenja
            }

            data.push(obj);
        });
        
        new Angular2Csv(data, 'kreditiReport', {headers: (head)});
    }

    /*
    *   DEPOZITI - metode
    */
    selektujSveTipoveDepozita() {
        for (var i = 0; i < this.tipoviDepozita.length; i++) {
          this.tipoviDepozita[i].selected = this.selectedAllDepozit;
        }
    }

    selektujTipDepozita() {
        this.selectedAllDepozit = this.tipoviDepozita.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziDepozite() {
        this.resetDepozitGrafova();
        this.selektovaniTipoviDepozita = [];

        for (var i = 0; i < this.tipoviDepozita.length; i++) {
            if(this.tipoviDepozita[i].selected) {
                this.selektovaniTipoviDepozita.push(this.tipoviDepozita[i]['_id']['tip_ugovora']);
            }
        }

        if(this.selektovaniTipoviDepozita.length > 0) {
            this.pripremaDepozitGrafova();
            
            let search = {
                tip_depozita: this.selektovaniTipoviDepozita,
                datum_od: null,
                datum_do: null
            }

            if(this.datumOdDepozit) {
                search.datum_od = this.datumOdDepozit['jsdate'];
            }

            if(this.datumDoDepozit) {
                search.datum_do = this.datumDoDepozit['jsdate'];
            }
    
            this.depozitService.pretraga(search).subscribe(depoziti => {
                if(depoziti.success) {
                    this.depozitiResult = depoziti.data;
    
                    this.generisanjePeriodaDepozitGrafa();
                    this.generisanjeBrojDepozitaGrafa();
                    this.generisanjeKolicinaDepozitaGrafa();
                    this.generisanjeGrafaDepozita();
                } else {
                    this.validateService.pokreniSwal('Greška!', depoziti.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.validateService.pokreniSwal('Greška!', "Odaberi tip depozita!", 'warning', 'Uredu');
        }
    }

    resetDepozitGrafova() {
        // Reset chart labela
        this.depozitBrojChartLabels = [];
        this.depozitKolicinaChartLabels = [];

        // Reset chart vrijednosti
        this.depozitBrojChartData.length = 1;
        this.depozitKolicinaChartData.length = 1;

        this.depozitDoughnutChartData.forEach(element => {
            element = 0;
        });

        this.depozitDoughnutChartLabels = [];
        this.tipoviDepozita.forEach(element => {
            this.depozitDoughnutChartLabels.push(element._id.opis_tipa_ugovora);
        });
    }

    pripremaDepozitGrafova() {
        while(this.depozitBrojChartData.length < this.selektovaniTipoviDepozita.length) {
            this.depozitBrojChartData.push({ data: [], label: "" });
        }

        while(this.depozitKolicinaChartData.length < this.selektovaniTipoviDepozita.length) {
            this.depozitKolicinaChartData.push({ data: [], label: "" });
        }
    }

    generisanjePeriodaDepozitGrafa() {
        this.periodDepozitGrafa = [];
        this.periodDepozitGrafa.push({
            mjesec: new Date(this.depozitiResult[0].datum_ugovora).getMonth() + 1,
            godina: new Date(this.depozitiResult[0].datum_ugovora).getFullYear(),
        });

        // get period
        this.depozitiResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.datum_ugovora);

            this.periodDepozitGrafa.forEach(element => {
                if(element.mjesec == tempDate.getMonth() + 1) {
                    if(element.godina == tempDate.getFullYear()) {
                        dodaj = false;
                    }
                }
            });

            if(dodaj) {
                let tempDatum = {
                    mjesec: new Date(tempDate).getMonth() + 1,
                    godina: new Date(tempDate).getFullYear(),
                }

                this.periodDepozitGrafa.push(tempDatum);
            }
        });
        
        // postavljanje labele na chart
        this.periodDepozitGrafa.forEach(element => {
            let datum = element.mjesec + '. mjesec ' + element.godina;
            this.depozitBrojChartLabels.push(datum);
            this.depozitKolicinaChartLabels.push(datum);
        });
    }

    generisanjeBrojDepozitaGrafa() {        
        let clone = JSON.parse(JSON.stringify(this.depozitBrojChartData));

        for(let i = 0; i < this.selektovaniTipoviDepozita.length; i++) {
            // računanje broja potpisanih ugovora po periodu
            let data = [];
            let labela = '';
            
            this.periodDepozitGrafa.forEach(element => {
                let broj = 0;

                this.depozitiResult.forEach(elementDepozit => {
                    if(elementDepozit.ugovor.tip_ugovora == this.selektovaniTipoviDepozita[i]) {
                        labela = elementDepozit.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementDepozit.datum_ugovora);
                    
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            ++broj;
                        }
                    }
                });

                data.push(broj);
            });

            clone[i].data = data;
            clone[i].label = labela;
        };

        this.depozitBrojChartData = clone;
    }

    generisanjeKolicinaDepozitaGrafa() {
        let clone = JSON.parse(JSON.stringify(this.depozitKolicinaChartData));

        for(let i = 0; i < this.selektovaniTipoviDepozita.length; i++) {
            // računanje iznosa potpisanih ugovora po periodu
            let data = [];
            let labela = '';

            this.periodDepozitGrafa.forEach(element => {
                let broj = 0.00;

                this.depozitiResult.forEach(elementDepozit => {
                    if(elementDepozit.ugovor.tip_ugovora == this.selektovaniTipoviDepozita[i]) {
                        labela = elementDepozit.ugovor.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementDepozit.datum_ugovora);
                        
                        if(datumUgovora.getMonth() + 1 == element.mjesec && datumUgovora.getFullYear() == element.godina) {
                            broj += Number(elementDepozit.stanje_racuna);
                        }
                    }
                });

                data.push(broj.toFixed(2));
            });

            clone[i].data = data;
            clone[i].label = labela;
        }

        this.depozitKolicinaChartData = clone;
    }

    generisanjeGrafaDepozita() {
        let labelaVrijednost = [];
        let doughnutVrijednosti = [];
        let vrijednosti = [];
        let horVrijednosti = [];
        let tempVrijednost;
        this.depozitHorizontalBarChartLabels = [];

        this.depozitKolicinaChartData.forEach(element => {
            tempVrijednost = 0;

            if(element.label != '') {
                element.data.forEach(elementData => {
                    tempVrijednost += Number(elementData);
                });

                vrijednosti.push({
                    labela: element.label,
                    vrijednost: Number(tempVrijednost.toFixed(2))
                });
            }
        });
        
        this.tipoviDepozita.forEach(element => {
            if(element.selected) {
                vrijednosti.forEach(elementVrijednosti => {
                    if(elementVrijednosti.labela == element._id.opis_tipa_ugovora) {
                        doughnutVrijednosti.push(elementVrijednosti.vrijednost);
                        labelaVrijednost.push({
                            labela: elementVrijednosti.labela,
                            vrijednost: elementVrijednosti.vrijednost
                        });
                    }
                });
            } else {
                doughnutVrijednosti.push(0);
            }
        });

        this.depozitDoughnutChartData = doughnutVrijednosti;

        labelaVrijednost.sort(function(a,b) {return (a.vrijednost > b.vrijednost) ? -1 : ((b.vrijednost > a.vrijednost) ? 1 : 0);} );
        labelaVrijednost.forEach(element => {
            this.depozitHorizontalBarChartLabels.push(element.labela);
            horVrijednosti.push(element.vrijednost);
        });

        this.depozitHorizontalBarChartData[0].data = horVrijednosti;
    }

    depozitiCsv() {
        let data = [];
        let head = [
            'Ime',
            'Prezime',
            'Broj l.k.',
            'JMBG',
            'Tip ugovora',
            'Opis tipa ugovora',
            'Partija',
            'Stanje racuna',
            'Datum ugovora',
            'Datum vazenja'
        ];

        this.depozitiResult.forEach(element => {
            let obj = {
                ime_klijenta: element.klijent.ime,
                prezime_klijenta: element.klijent.prezime,
                lk_klijenta: element.klijent.broj_lk,
                jmbg_klijenta: element.klijent.maticni_broj,
                tip_ugovora: element.ugovor.tip_ugovora,
                opis_tipa_ugovora: element.ugovor.opis_tipa_ugovora,
                partija: element.ugovor.partija,
                stanje_racuna: element.stanje_racuna,
                datum_ugovora: element.datum_ugovora,
                datum_vazenja: element.datum_vazenja
            }

            data.push(obj);
        });
        
        new Angular2Csv(data, 'depozitiReport', {headers: (head)});
    }

    /*
    *   POSLOVANJE - metode
    */
    traziPoslovanje() {
        let brojPonudjenihUslugaTemp = 0;
        let brojUgovorenihUslugaTemp = 0;
        let search = {
            datum_od: null,
            datum_do: null
        }

        if(this.datumOdPoslovanje) {
            search.datum_od = this.datumOdPoslovanje['jsdate'];
        }

        if(this.datumDoPoslovanje) {
            search.datum_do = this.datumDoPoslovanje['jsdate'];
        }

        this.klijentService.vratiSveKlijente().subscribe(klijenti => {
            this.brojKlijenata = klijenti.data.length;
        });

        this.navhomeService.getSvePretrage(search).subscribe(brojPretraga => {
            let poslovanjeKorisnikNiz;
            let unizu;
            this.pretragaOdjeli = [];
            this.poslovanjeKorisnik = [];
            this.pretrage = brojPretraga.data;
            this.brojPretraga = this.pretrage.length;

            this.pretrage.forEach(elementPretrage => {
                poslovanjeKorisnikNiz = false;
                unizu = false;

                this.pretragaOdjeli.forEach(elementPretragaOdjel => {
                    if(elementPretrage.korisnik.odjel.organizaciona_jedinica == elementPretragaOdjel['odjel']) {
                        ++elementPretragaOdjel['brojPretraga'];
                        unizu = true;
                    }
                });

                if(!unizu) {
                    this.pretragaOdjeli.push({
                        odjel: elementPretrage.korisnik.odjel.organizaciona_jedinica,
                        brojPretraga: 1
                    });
                }

                this.poslovanjeKorisnik.forEach(elementPoslovanjeKorisnik => {
                    if(elementPretrage.korisnik._id == elementPoslovanjeKorisnik['korisnik']['_id']) {
                        ++elementPoslovanjeKorisnik['brojPretraga'];
                        poslovanjeKorisnikNiz = true;
                    }
                });

                if(!poslovanjeKorisnikNiz) {
                    this.poslovanjeKorisnik.push({
                        korisnik: elementPretrage.korisnik,
                        brojPretraga: 1,
                        brojPonudjenihUsluga: 0,
                        brojUgovorenihUsluga: 0,
                        brojBiljeski: 0
                    });
                }
            });

            this.pretragaOdjeli.sort(function(a,b) {return (b.brojPretraga > a.brojPretraga) ? 1 : ((a.brojPretraga > b.brojPretraga) ? -1 : 0);} );
        });

        this.klijentPonudeService.svePonude(search).subscribe(ponude => {
            let ponudjenaUslugaUnizu;
            let ugovorenaUslugaUnizu;
            this.ponudjeneUsluge = [];
            this.ugovoreneUsluge = [];
            this.ponude = ponude.data;

            this.ponude.forEach(elementPonude => {
                brojPonudjenihUslugaTemp += elementPonude.ponudjene_usluge.length;
                brojUgovorenihUslugaTemp += elementPonude.ugovorene_usluge.length;
                ponudjenaUslugaUnizu = false;
                ugovorenaUslugaUnizu = false;

                elementPonude.ponudjene_usluge.forEach(element => {
                    this.ponudjeneUsluge.forEach(elementPonudjeneUslge => {
                        if(element.naziv_ponude == elementPonudjeneUslge['naziv_ponude']) {
                            ++elementPonudjeneUslge['brojPonuda'];
                            ponudjenaUslugaUnizu = true;
                        }
                    });

                    if(!ponudjenaUslugaUnizu) {
                        this.ponudjeneUsluge.push({
                            naziv_ponude: element['naziv_ponude'],
                            brojPonuda: 1
                        });
                    }
                });

                elementPonude.ugovorene_usluge.forEach(element => {
                    this.ugovoreneUsluge.forEach(elementUgovoreneUslge => {
                        if(element.naziv_ponude == elementUgovoreneUslge['naziv_ponude']) {
                            ++elementUgovoreneUslge['brojPonuda'];
                            ugovorenaUslugaUnizu = true;
                        }
                    });

                    if(!ugovorenaUslugaUnizu) {
                        this.ugovoreneUsluge.push({
                            naziv_ponude: element['naziv_ponude'],
                            brojPonuda: 1
                        });
                    }
                });

                this.poslovanjeKorisnik.forEach(element => {
                    if(element.korisnik._id == elementPonude.evidentirao._id) {
                        element.brojPonudjenihUsluga += elementPonude.ponudjene_usluge.length;
                        element.brojUgovorenihUsluga += elementPonude.ugovorene_usluge.length;
                    }
                });
            });

            this.brojPonudjenihUsluga = brojPonudjenihUslugaTemp;
            this.brojUgovorenihUsluga = brojUgovorenihUslugaTemp;
            this.ponudjeneUsluge.sort(function(a,b) {return (b.brojPonuda > a.brojPonuda) ? 1 : ((a.brojPonuda > b.brojPonuda) ? -1 : 0);} );
            if(this.ponudjeneUsluge.length > 10) {
                this.ponudjeneUsluge.length = 10;
            }
            this.ugovoreneUsluge.sort(function(a,b) {return (b.brojPonuda > a.brojPonuda) ? 1 : ((a.brojPonuda > b.brojPonuda) ? -1 : 0);} );
            if(this.ugovoreneUsluge.length > 10) {
                this.ugovoreneUsluge.length = 10;
            }
        });

        this.biljeskaService.sveBiljeske(search).subscribe(biljeske => {
            this.biljeske = biljeske.data;
            this.brojBiljeski = this.biljeske.length;

            this.biljeske.forEach(elementBiljeske => {
                this.poslovanjeKorisnik.forEach(element => {
                    if(element.korisnik._id == elementBiljeske.kreirao._id) {
                        ++element['brojBiljeski'];
                    }
                });
            });

            this.poslovanjeKorisnik.sort(function(a,b) {return (b.brojPretraga > a.brojPretraga) ? 1 : ((a.brojPretraga > b.brojPretraga) ? -1 : 0);} );
        });
    }

    promjenaLabele(lbl) {
        this.labela = lbl;
    }
}