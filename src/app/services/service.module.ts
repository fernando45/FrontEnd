import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { UsersValidator} from '../validators/usuarios/users-validators';





import {
    SettingsService,
    FormsService,
    SidebarService,
    UsuarioService,
    ClienteService,
    LoginGuardGuard,
    SubirArchivoService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard


 } from './services.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    FormsService,
    SidebarService,
    UsuarioService,
    ClienteService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    UsersValidator,
    VerificaTokenGuard
  ]
  

})
export class ServiceModule { }
