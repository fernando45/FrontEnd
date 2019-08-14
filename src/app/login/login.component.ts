import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { UserIdleService } from 'angular-user-idle';
import Swal from 'sweetalert2';
// import { CompileTemplateMetadata } from '@angular/compiler';
// import { interval, timer } from 'rxjs';
// import { timeInterval } from 'rxjs/operators';



declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  // sesion: SesionComponent;

  constructor(
     public router: Router,
     public _usuarioService: UsuarioService,
     private userIdle: UserIdleService,
     private zone: NgZone
      ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }


  }

  InciarIdle() {

    // Logica del servicvio:

    // El usuario está inactivo el tiempo que dice idle
    // Se dispara ontimeStart y cuenta el tiempo de timeout:
    // El usuario no detiene el ontimerStart, este finaliza y dispara el onTimeout

    this.userIdle.setConfigValues({idle: 1800, timeout: 1, ping: 120}); // 1800- 30 minuntos.

    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {});
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.userIdle.stopWatching();

      let timerInterval;

      Swal.fire({
        title: 'Alerta de cierre por inactividad',
        html:
          'Se cerrará en:  <strong></strong>  segundos <br/><br/><br/>' +
          '<button id="increase" class="btn btn-warning">' +
            'Continuar con la sessión' +
          '</button><br/>',
        timer: 60000,

        onBeforeOpen: () => {
          const content = Swal.getContent();
          const $ = content.querySelector.bind(content);


          const increase = $('#increase');

          Swal.showLoading();

          increase.addEventListener('click', () => {
            Swal.close ();
            this.resetIdle();
          });


          timerInterval = setInterval(() => {

            Swal.getContent().querySelector('strong')
            .textContent = (Swal.getTimerLeft() / 1000)
              .toFixed(0);


          }, 100);
        },

        onClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {

         if (result.dismiss === Swal.DismissReason.timer)  {
           this.zone.run(() => {
             location.reload();
             this._usuarioService.logout();
           });
        }

      });
    });
  }


  resetIdle() {
    this.userIdle.resetTimer();
    this.userIdle.startWatching();
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


      this._usuarioService.loginGoogle( token )
        .subscribe(resp => window.location.href = '#/dashboard' );
      this.InciarIdle();


    });

  }

  ingresar( forma: NgForm  ) {

    if ( forma.invalid) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password);
    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( () => {
        return this.router.navigate(['/dashboard']);

      } );

  }


}
