import { ResultToken } from './../../../.src/app/generated/types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { LoginData} from './login.interface';





declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoginData = {
    email: '',
    password: ''
  };

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  // sesion: SesionComponent;

  constructor(
     public router: Router,
     public _USUARIOSERVICE: UsuarioService,

      ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }



  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '846182145219-701atjhrvq086rb091boksmdf4safkrr.apps.googleusercontent.com',
        cokiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;


      this._USUARIOSERVICE.loginGoogle( token )
        .subscribe(resp => window.location.href = '#/dashboard' );


    });

  }


  ingresar( forma: NgForm  ) {

    if ( forma.invalid) {
      return;
    }

    this._USUARIOSERVICE.login( this.user.email, this.user.password )
      .subscribe( ( result: ResultToken) => {
     
        return this.router.navigate(['/dashboard']);
    });

  }


}
