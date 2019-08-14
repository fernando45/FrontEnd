import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any [] = [];

  

  constructor(
     public http: HttpClient,
     public router: Router,
     public _subirArchivoService: SubirArchivoService,
     ) {
     this.cargaStorage();
  }

 


  estaLogueado() {
    return( this.token.length > 5) ? true : false;
  }

   cargaStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem( 'usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
   }


  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/google';

    let idtoken = token;

    return this.http.post( url, { idtoken })
      .pipe(
        map((resp: any) => {

          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu );
          
          return true;

        }));

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {

      localStorage.setItem ( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any) => {

       
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu );
          return resp.status;

        }))
      .pipe(
        catchError(err =>
          of([
            console.log('HTTP Error', err.status),
            Swal.fire(
              'Error Login',
              err.error.mensaje,
              'error'
            )
          ])
        )
      );

  }

  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
        .pipe(
          map( (resp: any) => {
            Swal.fire({
              title: 'Usuario creado',
              text: usuario.email,
              type: 'success',
              confirmButtonText: 'Cool'
            });

            return resp.usuario;

        }))
      .pipe(
        catchError(err =>
          of([
            Swal.fire(
              'Error Login',
              err.error.mensaje,
              'error'
            )
          ])
        )
      );

  }

  actualizarUsuario( usuario: Usuario ) {


    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    url += '?token=' + this.token;


    return this.http.put( url, usuario )
      .pipe(
        map((resp: any) => {

        if ( usuario._id === this.usuario._id ) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu) ;

        }

        Swal.fire({
            title: 'Usuario actualizado',
            text: usuario.nombre,
            type: 'success',
            confirmButtonText: 'Cool'
          });
        return true;
        }));
    }

    cambiarImagen( archivo: File, id: string ) {

      this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            Swal.fire({
              title: 'Imagen actualizada',
              text: this.usuario.nombre,
              type: 'success',
              confirmButtonText: 'Cool'
            });
            this.guardarStorage( id, this.token, this.usuario, this.menu );
          })
          .catch( resp => {
             console.log(resp);
          });

    }

    cargarUsuarios( desde: number = 0 ) {

      const url = URL_SERVICIOS + '/usuario?desde=' + desde;

      return this.http.get( url );

    }

     buscarUsuarios( termino: String ) {

      const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this.http.get( url )
        .pipe( map((resp: any) => resp.usuarios));
     }

     borrarUsuario( id: string ) {

      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;

      return this.http.delete( url );

     }


}


