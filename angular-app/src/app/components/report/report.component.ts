import { Component, OnInit, transition } from '@angular/core';
import { DepozitService } from '../../services/depozit.service';
import { KarticaService } from '../../services/kartica.service';
import { KreditService } from '../../services/kredit.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    // depoziti
    tipoviDepozita: any;
    selectedAllDepozit: any;
    depozitiResult: any;
    selektovaniTipoviDepozita: Array<Object> = [];
    datumOdDepozit: Date;
    datumDoDepozit: Date;
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

    /*
    * GRAFOVI DEPOZITA
    */
    periodDepozitGrafa: Array<any> = [];
    // broj depozita graf
    public depozitBrojChartData:any[] = [{data: [], label: ''}];
    public depozitBrojChartLabels:string[] = [];
    public depozitBrojChartLegend:boolean = true;
    public depozitBrojChartType:string = 'line';
    // kolicina depozita graf
    public depozitKolicinaChartData:any[] = [{data: [], label: ''}];
    public depozitKolicinaChartLabels:string[] = [];
    public depozitKolicinaChartLegend:boolean = true;
    public depozitKolicinaChartType:string = 'line';
    // depoziti
    public doughnutChartData:number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    public doughnutChartLabels:string[] = [];
    public doughnutChartType:string = 'pie';
    public doughnutChartOptions:any = {
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
            position: 'left'
        }
    }

    /*
    * GRAFOVI KARTICA
    */
    periodKarticaGrafa: Array<any> = [];
    // broj kartica graf
    public karticaBrojChartData:any[] = [{data: [], label: ''}];
    public karticaBrojChartLabels:string[] = [];
    public karticaBrojChartLegend:boolean = true;
    public karticaBrojChartType:string = 'line';

    /*
    * GRAFOVI KREDITA
    */
    periodKreditGrafa: Array<any> = [];
    // broj kredita graf
    public kreditBrojChartData:any[] = [{data: [], label: ''}];
    public kreditBrojChartLabels:string[] = [];
    public kreditBrojChartLegend:boolean = true;
    public kreditBrojChartType:string = 'line';
    // kolicina kredita graf
    public kreditKolicinaChartData:any[] = [{data: [], label: ''}];
    public kreditKolicinaChartLabels:string[] = [];
    public kreditKolicinaChartLegend:boolean = true;
    public kreditKolicinaChartType:string = 'line';
    // krediti
    public kreditDoughnutChartData:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public kreditDoughnutChartLabels:string[] = [];
    public kreditDoughnutChartType:string = 'pie';
    public kreditDoughnutChartOptions:any = {
        title: {
            display: true,
            text: 'Krediti'
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
            position: 'left'
        }
    };

    /*
    * GRAFOVI UNIVERZALNA KONFIGURACIJA
    */
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
                        stepSize: 1
                    }
                }]
        }
    };

    public lineKolicinaChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        title: {
            display: true,
            text: 'Iznos potpisanih ugovora'
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
        }
    };

    constructor(private depozitService: DepozitService, private karticaService: KarticaService, private kreditService: KreditService) { }

    ngOnInit() {
        this.depozitService.vratiSveTipove().subscribe(tipoviDepozita => {
            this.tipoviDepozita = tipoviDepozita.data;

            this.tipoviDepozita.forEach(element => {
                this.doughnutChartLabels.push(element._id.opis_tipa_ugovora);
            });
        });

        this.karticaService.tipoviUgovora().subscribe(tipoviUgovora => {
            this.tipoviUgovoraKartica = tipoviUgovora.data;
        });

        this.karticaService.tipoviKartica().subscribe(tipoviKartica => {
            this.tipoviKartica = tipoviKartica.data;
        });

        this.karticaService.vrsteKartica().subscribe(vrsteKartica => {
            this.vrsteKartica = vrsteKartica.data;
        });

        this.kreditService.tipoviUgovora().subscribe(tipoviKredita => {
            this.tipoviUgovoraKredita = tipoviKredita.data;

            this.tipoviUgovoraKredita.forEach(element => {
                this.kreditDoughnutChartLabels.push(element._id.opis_tipa_ugovora);
            });
        });
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
        this.selektovaniTipoviDepozita = [];

        this.resetDepozitGrafova();

        for (var i = 0; i < this.tipoviDepozita.length; i++) {
            if(this.tipoviDepozita[i].selected) {
                this.selektovaniTipoviDepozita.push(this.tipoviDepozita[i]['_id']['tip_ugovora']);
            }
        }

        if(this.selektovaniTipoviDepozita.length > 0) {
            this.pripremaDepozitGrafova();
            
            let search = {
                tip_depozita: this.selektovaniTipoviDepozita,
                datum_od: this.datumOdDepozit,
                datum_do: this.datumDoDepozit
            }
    
            this.depozitService.pretraga(search).subscribe(depoziti => {
                if(depoziti.success) {
                    this.depozitiResult = depoziti.data;
    
                    this.generisanjePeriodaDepozitGrafa();
                    this.generisanjeBrojDepozitaGrafa();
                    this.generisanjeKolicinaDepozitaGrafa();
                    this.generisanjeGrafaDepozita();
                } else {
                    this.pokreniSwal('Greška!', depoziti.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.pokreniSwal('Greška!', "Odaberi tip depozita!", 'warning', 'Uredu');
        }
    }

    resetDepozitGrafova() {
        // Reset chart labela
        this.depozitBrojChartLabels = [];
        this.depozitKolicinaChartLabels = [];

        // Reset chart vrijednosti
        this.depozitBrojChartData.length = 1;
        this.depozitKolicinaChartData.length = 1;

        this.doughnutChartData.forEach(element => {
            element = 0;
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
                    if(elementDepozit.tip_ugovora == this.selektovaniTipoviDepozita[i]) {
                        labela = elementDepozit.opis_tipa_ugovora;

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
                    if(elementDepozit.tip_ugovora == this.selektovaniTipoviDepozita[i]) {
                        labela = elementDepozit.opis_tipa_ugovora;

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
        let vrijednosti = [];
        let tempVrijednost;

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

        let doughnutVrijednosti = [];
        this.tipoviDepozita.forEach(element => {
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

        this.doughnutChartData = doughnutVrijednosti;
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
        this.selektovaniTipoviUgovoraKartica = [];

        this.resetKarticaGrafova();

        for (var i = 0; i < this.tipoviUgovoraKartica.length; i++) {
            if(this.tipoviUgovoraKartica[i].selected) {
                this.selektovaniTipoviUgovoraKartica.push(this.tipoviUgovoraKartica[i]['_id']['tip_ugovora']);
            }
        }

        if(this.selektovaniTipoviUgovoraKartica.length > 0) {
            this.pripremaKarticaGrafova();
            
            let search = {
                tip_ugovora: this.selektovaniTipoviUgovoraKartica,
                tip_kartice: this.tipKarticeRadio,
                vrsta_kartice: this.vrstaKarticeRadio,
                datum_od: this.datumOdKartica,
                datum_do: this.datumDoKartica
            }

            this.karticaService.pretraga(search).subscribe(kartice => {
                if(kartice.success) {
                    this.karticeResult = kartice.data;

                    this.generisanjePeriodaKarticaGrafa();
                    this.generisanjeBrojKarticaGrafa();
                } else {
                    this.pokreniSwal('Greška!', kartice.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.pokreniSwal('Greška!', "Odaberi tip ugovora!", 'warning', 'Uredu');
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
            mjesec: new Date(this.karticeResult[0].datum_ugovora).getMonth() + 1,
            godina: new Date(this.karticeResult[0].datum_ugovora).getFullYear(),
        });

        // get period
        this.karticeResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.datum_ugovora);

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
                    if(elementKartica.tip_ugovora == this.selektovaniTipoviUgovoraKartica[i]) {
                        labela = elementKartica.opis_tipa_ugovora;

                        let datumUgovora = new Date(elementKartica.datum_ugovora);
                    
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
        this.selektovaniTipoviUgovoraKredita = [];

        this.resetKreditGrafova();

        this.tipoviUgovoraKredita.forEach(element => {
            if(element.selected) {
                this.selektovaniTipoviUgovoraKredita.push(element['_id']['tip_ugovora']);
            }
        });

        if(this.selektovaniTipoviUgovoraKredita.length > 0) {
            this.pripremaKreditGrafova();
            
            let search = {
                tip_ugovora: this.selektovaniTipoviUgovoraKredita,
                datum_od: this.datumOdKredit,
                datum_do: this.datumDoKredit
            }

            this.kreditService.pretraga(search).subscribe(krediti => {
                if(krediti.success) {
                    this.kreditiResult = krediti.data;

                    this.generisanjePeriodaKreditGrafa();
                    this.generisanjeBrojKreditaGrafa();
                    this.generisanjeKolicinaKreditaGrafa();
                    this.generisanjeGrafaKredita();
                } else {
                    this.pokreniSwal('Greška!', krediti.msg, 'error', 'Uredu');
                }
            });
        } else {
            this.pokreniSwal('Greška!', "Odaberi tip ugovora!", 'warning', 'Uredu');
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
            element = 0;
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
                    if(elementKredit.tip_ugovora == this.selektovaniTipoviUgovoraKredita[i]) {
                        labela = elementKredit.opis_tipa_ugovora;

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
                    if(elementKredit.tip_ugovora == this.selektovaniTipoviUgovoraKredita[i]) {
                        labela = elementKredit.opis_tipa_ugovora;

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
        let vrijednosti = [];
        let tempVrijednost;

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

        let doughnutVrijednosti = [];
        this.tipoviUgovoraKredita.forEach(element => {
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

        this.kreditDoughnutChartData = doughnutVrijednosti;
    }
    
    pokreniSwal(title, text, type, confirmButtonText) {
        swal({
            title: title,
            text: text,
            type: type,
            confirmButtonText: confirmButtonText
        });
    }
}