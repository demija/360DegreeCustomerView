import { Component, OnInit, transition } from '@angular/core';
import { DepozitService } from '../../services/depozit.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    tipoviDepozita: any;
    selectedAll: any;

    depozitiResult: any;

    selektovaniTipoviDepozita: Array<Object> = [];
    datumOd: Date;
    datumDo: Date;

    /*
    * GRAFOVI DEPOZITA
    */
    periodGrafa: Array<any> = [];

    // broj depozita graf
    public depozitBrojChartData:any[] = [{data: [], label: ''}];
    public depozitBrojChartLabels:string[] = [];
    public depozitBrojChartLegend:boolean = true;
    public depozitBrojChartType:string = 'line';
    public depozitBrojChartOptions:any = {
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
                        labelString: 'Period'
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

    // kolicina depozita graf
    public depozitKolicinaChartData:any[] = [{data: [], label: ''}];
    public depozitKolicinaChartLabels:string[] = [];
    public depozitKolicinaChartLegend:boolean = true;
    public depozitKolicinaChartType:string = 'line';
    public depozitKolicinaChartOptions:any = {
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
                        labelString: 'Period'
                    }
                }],
            yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'KM'
                    },
                    ticks: {
                        beginAtZero: true,
                    }
                }]
        }
    };

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
    * GRAFOVI DEPOZITI KRAJ
    */

    constructor(private depozitService: DepozitService) { }

    ngOnInit() {
        this.depozitService.vratiSveTipove().subscribe(tipovi => {
            this.tipoviDepozita = tipovi.data;

            this.tipoviDepozita.forEach(element => {
                this.doughnutChartLabels.push(element._id.opis_tipa_ugovora);
            });
        });
    }

    selektujSveTipoveDepozita() {
        for (var i = 0; i < this.tipoviDepozita.length; i++) {
          this.tipoviDepozita[i].selected = this.selectedAll;
        }
    }

    selektujTipDepozita() {
        this.selectedAll = this.tipoviDepozita.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziDepozite() {
        this.selektovaniTipoviDepozita = [];

        this.resetGrafova();

        for (var i = 0; i < this.tipoviDepozita.length; i++) {
            if(this.tipoviDepozita[i].selected) {
                this.selektovaniTipoviDepozita.push(this.tipoviDepozita[i]['_id']['tip_ugovora']);
            }
        }

        if(this.selektovaniTipoviDepozita.length > 0) {
            this.pripremaGrafova();
            
            let search = {
                tip_depozita: this.selektovaniTipoviDepozita,
                datum_od: this.datumOd,
                datum_do: this.datumDo
            }
    
            this.depozitService.pretraga(search).subscribe(depoziti => {
                if(depoziti.success) {
                    this.depozitiResult = depoziti.data;
    
                    this.generisanjePeriodaGrafa();
                    this.generisanjeBrojDepozitaGrafa();
                    this.generisanjeKolicinaDepozitaGrafa();
                    this.generisanjeGrafaDepozita();
                } else {
                    swal({
                        title: 'Greška!',
                        text: depoziti.msg,
                        type: 'error',
                        confirmButtonText: 'Uredu'
                    });
                }
            });
        } else {
            swal({
                title: 'Greška!',
                text: "Odaberi tip depozita!",
                type: 'warning',
                confirmButtonText: 'Uredu'
            });
        }
    }

    //
    pripremaGrafova() {
        while(this.depozitBrojChartData.length < this.selektovaniTipoviDepozita.length) {
            this.depozitBrojChartData.push({ data: [], label: "" });
        }

        while(this.depozitKolicinaChartData.length < this.selektovaniTipoviDepozita.length) {
            this.depozitKolicinaChartData.push({ data: [], label: "" });
        }
    }

    generisanjePeriodaGrafa() {
        this.periodGrafa = [];
        
        this.periodGrafa.push({
            mjesec: new Date(this.depozitiResult[0].datum_ugovora).getMonth() + 1,
            godina: new Date(this.depozitiResult[0].datum_ugovora).getFullYear(),
        });

        // get period
        this.depozitiResult.forEach(element => {
            var dodaj = true;
            var tempDate = new Date(element.datum_ugovora);

            this.periodGrafa.forEach(element => {
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

                this.periodGrafa.push(tempDatum);
            }
        });
        
        // postavljanje labele na chart
        this.periodGrafa.forEach(element => {
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
            
            this.periodGrafa.forEach(element => {
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

            this.periodGrafa.forEach(element => {
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

    resetGrafova() {
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
    //
}