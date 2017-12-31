import { Component, OnInit } from '@angular/core';
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

    depozitiResult: Object;

    selectedTipDepozita: Array<Object> = [];
    datumOd: Date;
    datumDo: Date;

    constructor(private depozitService: DepozitService) { }

    ngOnInit() {
        this.depozitService.getSveTipoveDepozita().subscribe(tipovi => {
            this.tipoviDepozita = tipovi.data;
        });
    }

    selectAll() {
        for (var i = 0; i < this.tipoviDepozita.length; i++) {
          this.tipoviDepozita[i].selected = this.selectedAll;
        }
    }

    checkIfAllSelected() {
        this.selectedAll = this.tipoviDepozita.every(function(item:any) {
            return item.selected == true;
        });
    }

    traziDepozite() {
        this.selectedTipDepozita = [];

        for (var i = 0; i < this.tipoviDepozita.length; i++) {
            if(this.tipoviDepozita[i].selected) {
                this.selectedTipDepozita.push(this.tipoviDepozita[i]['_id']['tip_ugovora']);
            }
        }

        let search = {
            tip_depozita: this.selectedTipDepozita,
            datum_od: this.datumOd,
            datum_do: this.datumDo
        }

        this.depozitService.getDepozite(search).subscribe(depoziti => {
            if(depoziti.success) {
                this.depozitiResult = depoziti.data;
            } else {
                swal({
                    title: 'Greška!',
                    text: depoziti.msg,
                    type: 'error',
                    confirmButtonText: 'Uredu'
                });
            }
        });
    }

    // lineChart
    //lineChartData:Array<any>;
    //lineChartLabels:Array<any>;
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Naziv A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Ime C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    //
}