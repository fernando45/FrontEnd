import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { UserIdleModule } from 'angular-user-idle';
import { DxButtonModule, DxDataGridModule, DxToolbarModule, DxPopupModule, DxBoxModule,
         DxSelectBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ComponentsModule } from '../components/components.module';
import { AvatarModule } from 'ngx-avatar';





@NgModule({

    declarations: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        UsuarioComponent,


    ],

    exports: [
        DashboardComponent,
        ProgressComponent

    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        CommonModule,
        UserIdleModule.forRoot({idle: 6, timeout: 300, ping: 120}),
        DxButtonModule,
        DxDataGridModule,
        BrowserModule,
        DxToolbarModule,
        ComponentsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AvatarModule,
        DxPopupModule,
        DxBoxModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxButtonModule,
        DxValidatorModule
        
    ],


})

export class PagesModule { }
