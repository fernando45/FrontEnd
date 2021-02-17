import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/services.index';
import { Router } from '@angular/router';
import { RegisterData } from './login.interface';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  forma: FormGroup;

  register: RegisterData = {
    nombre: '',
    email: '',
    password: ''

  };

  constructor(
// tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

    sonIguales( campo1: string, campo2: string ) {

      return ( group: FormGroup ) => {

        const pass1 = group.controls[campo1].value;
        const pass2 = group.controls[campo2].value;

        if ( pass1 === pass2) {
          return null;
        }

        return {
            sonIguales: true
      };

      };

    }

  ngOnInit() {

    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( '', Validators.required ),
      correo: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', Validators.required ),
      password2: new FormControl('', Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2') });

  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        type: 'warning',
        confirmButtonText: 'Cool'
      });

      return;
    }

    this.register.nombre = this.forma.value.nombre;
    this.register.email = this.forma.value.correo;
    this.register.password = this.forma.value.password;

    this._usuarioService.register( this.register )
     // .subscribe( (resp: any)  =>   this.router.navigate(['/login']));
     .subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });



  }

}
