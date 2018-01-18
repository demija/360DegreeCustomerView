import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { NavhomeService } from './services/navhome.service';
import { PonudeService } from './services/ponude.service';
import { DepozitService } from './services/depozit.service';
import { KreditService } from './services/kredit.service';
import { RacunService } from './services/racun.service';
import { BiljeskaService } from './services/biljeska.service';
import { KlijentService } from './services/klijent.service';
import { KompanijaService } from './services/kompanija.service';
import { KlijentPonudeService } from './services/klijent-ponude.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MyDatePickerModule } from 'mydatepicker';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ReportComponent } from './components/report/report.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'adminpanel',
        component: AdminpanelComponent,
    },
    {
        path: 'report',
        component: ReportComponent
    },
    {
        path: 'clients',
        component: ClientsComponent
    }
]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        SidebarComponent,
        AdminpanelComponent,
        ReportComponent,
        ClientsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        Angular2FontawesomeModule,
        ChartsModule,
        NgxPaginationModule,
        MyDatePickerModule
    ],
    providers: [
        ValidateService,
        AuthService,
        NavhomeService,
        PonudeService,
        DepozitService,
        KreditService,
        RacunService,
        BiljeskaService,
        KlijentService,
        KompanijaService,
        KlijentPonudeService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
