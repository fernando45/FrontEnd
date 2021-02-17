import {  Injectable, NgZone  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { LoginGQL, AddUserGQL, AllUsersGQL, AllUsersQuery, UserGQL, UserPorEmailGQL,
         ActualizaUsuarioGQL, EliminarUsuarioGQL, RenuevaTokenGQL } from './usuario.graphql-gen';
import { User, UserInput } from '../../../../.src/app/generated/types';
import { UserIdleService } from 'angular-user-idle';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'rxjs/internal/Observable';
import { FormsService } from '../shared/forms.service';






const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

@Injectable({
  providedIn: 'root'
})



export class UsuarioService {  
  


  usuario: User;
  token: string;
  expira: string;
  menu: any [] = [];
  resul: AllUsersQuery;



  constructor(
     public http: HttpClient,
     public router: Router,
     public _SUBIRARCHIVOSERVICE: SubirArchivoService,
     private logi: LoginGQL,
     private addUser: AddUserGQL,
     private allUsers: AllUsersGQL,
     private upUser: ActualizaUsuarioGQL,
     private userId: UserGQL,
     private userIdle: UserIdleService,
     private userEmail: UserPorEmailGQL,
     private eliminaUsuario: EliminarUsuarioGQL,
     private reToken: RenuevaTokenGQL,
     private zone: NgZone,
     private utiles: FormsService
     ) {
     this.cargaStorage();
    // this.http = http;
  }



  estaLogueado(): boolean {
    if ( this.token.length > 5) {
      return true;
    }
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


  guardarStorage( id: string, token: string, usuario: User, menu: any ) {

    const hoy = new Date();
    hoy.setSeconds( 3600 ); // Una Hora.

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

    const idtoken = token;

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
    this.userIdle.stopWatching();

  }

  login(email: string, password: string) {

    return this.logi.watch({
        email,
        password
    },
    {fetchPolicy: 'network-only'})
    .valueChanges
    .pipe(
      map(result => {

        if (result.data.login.status === false) {
          Swal.fire({
            title: 'Oopss Login incorrecto',
            type: 'warning',
            confirmButtonText: 'Cool',
            text: result.data.login.message,
           // icon = "error"
          });

       } else {
          this.guardarStorage(result.data.login.user._id, result.data.login.token,
                             result.data.login.user, this.obtenerMenu(result.data.login.user.role));
          this.IniciarIdle();
       }

        return result.data.login;

      }));
  }

  ampliaToken(email: string ) {

    return this.reToken.watch({
        email

    },
    {fetchPolicy: 'network-only',
    context: {
       headers: new HttpHeaders({
         authorization: this.token
       })
    }
   })
    .valueChanges
    .pipe(
      map( result => {

        if (result.errors) {
          this.router.navigate(['/login']);
          return Observable.throw( result.errors );
        }

        this.token = result.data.renuevaToken.token;
        localStorage.setItem('token', this.token );
        console.log('Token renovado');
        return true;


      }
      ));
  }


  actualizarUsuario( user: UserInput ) {
  return this.upUser
      .mutate({
        user,
      },
      {
        context: {
          headers: new HttpHeaders({
            authorization: this.token
          })
       }

      }).pipe(map(( result ) => {
        const esOk: boolean  = result.data.actualizarUsuario.status;
        return result.data.actualizarUsuario;
      }));
  }


  newUser( user: UserInput) {

    return this.addUser
    .mutate({
        user,


    }).pipe(map(( result) => {
      return result.data;
    }));
  }

  register(user: UserInput) {
    return this.addUser
      .mutate({
          user,

      }).pipe(map(( result ) => {
        const esOk: boolean  = result.data.register.status;

        if (esOk) {
          Swal.fire({
            title: 'Usuario creado',
            text: user.email,
            type: 'success',
            confirmButtonText: 'Cool'
           // icon = "error"
          });

          return result.data.register;

        } else {
          Swal.fire({
            title: 'Oopss algo ha pasado',
            type: 'warning',
            confirmButtonText: 'Cool',
            text: result.data.register.message,
           // icon = "error"
          });

        }

      }));
  }

  // METODO ADAPTADO PARA CUMSTONSTORE DEL DATAGRID************************
   getUsers( skip: number, limit: number , orden: string , filter: string ): Promise<AllUsersQuery> {
    console.log('GetUser ' + orden);
    return new Promise((resolve, reject) => {
       this.allUser( skip, limit, orden, filter)
       .subscribe( (resp: AllUsersQuery) => {
         resolve( resp);
        });
    });

  }


  allUser( skip: number, limit: number, orden: string = '', filter: any) {
    return this.allUsers.watch({
      skip,
      limit,
      orden,
      filter
  },
  {fetchPolicy: 'network-only',
   context: {
      headers: new HttpHeaders({
        authorization: this.token
      })
   }
  })
  .valueChanges
  .pipe(
    map(result => result.data )

  );
  }

  getUser( id: string ) {
    return this.userId.watch({
      id,
    },
    {fetchPolicy: 'network-only',
   context: {
      headers: new HttpHeaders({
        authorization: this.token
      })
   }
  })
    .valueChanges
    .pipe(
      map((result) =>  {
        return result.data;
      }));
  }

  getUserPorEmail( email: string) {
    return this.userEmail.watch({
      email,
    },
    {fetchPolicy: 'network-only',
   context: {
      headers: new HttpHeaders({
        authorization: this.token
      })
   }
  })
    .valueChanges
    .pipe(
      map((result) =>  {
        return result.data;
      }));

  }

  cambiarImagen( archivo: File, id: string ) {

      this._SUBIRARCHIVOSERVICE.subirArchivo( archivo, 'usuarios', id)
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

  buscarUsuarios( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this.http.get( url )
        .pipe( map((resp: any) => resp.usuarios));
  }

  borrarUsuario( id: string ) {
      return this.eliminaUsuario
      .mutate({
        id,
      },
      {
        context: {
          headers: new HttpHeaders({
            authorization: this.token
          })
       }

      }).pipe(map(( result ) => {
          return result.data.eliminarUsuario.status;
      }));
  }

  private obtenerMenu(ROLE) {

      const menu = [{
              titulo: 'Principal',
              icono: 'mdi mdi-gauge',
              submenu: [
                  { titulo: 'Dashboard', url: '/dashboard' },
                  { titulo: 'ProgressBar', url: '/progress' },
                  { titulo: 'Graficas', url: '/graficas1' },
                  { titulo: 'Promesas', url: '/promesas' },
                  { titulo: 'Rsjx', url: '/rxjs' }
              ]
          },
          {
              titulo: 'Mantenimientos',
              icono: 'mdi mdi-folder-lock-open',
              submenu: [
                 // { titulo: 'Usuarios', url: '/usuarios' },
                  { titulo: 'Hospitales', url: '/hospitales' },
                  { titulo: 'Medicos', url: '/medicos' },

              ]
          }
      ];

      if (ROLE === 'ADMIN') {
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
      }

      return menu;

  }

  //  CONTROL DE TIEMPO DE LA SESION

  IniciarIdle() {

    // Logica del servicvio:

    // El usuario está inactivo el tiempo que dice idle
    // Se dispara ontimeStart y cuenta el tiempo de timeout:
    // El usuario no detiene el ontimerStart, este finaliza y dispara el onTimeout

    this.userIdle.setConfigValues({idle: 180, timeout: 1, ping: 120}); // 1800- 30 minuntos.

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
             this.logout();
           });
        }

      });
    });
  }

  resetIdle() {
    this.userIdle.resetTimer();
    this.userIdle.startWatching();
  }

//  TRABAJO CON DEVEXTREME
getStore() {
  const that = this;

  return new CustomStore({
    key: '_id',
    load(loadOptions: any) {

        const skip: number = loadOptions.skip;
        const limit: number = loadOptions.take;
        const orden: string = '';
        const filter: string = null;

        const ola = that.utiles.creaFiltro(loadOptions.filter);

      

        if (loadOptions.sort) {
          this.orden = '';
          for ( const i in loadOptions.sort) {
            if (loadOptions.sort[i].desc ) {
              this.orden +=  ' -' + loadOptions.sort[i].selector;
             } else {
              this.orden += ' ' + loadOptions.sort[i].selector;
             }
          }
        }


        return that.getUsers(skip, limit, this.orden, filter )
          .then((data: AllUsersQuery) => {

            return {
            data: data.users.user,
            totalCount: data.totalCount
           };

            })
            .catch(error => {
              console.log( error );
              throw new Error('Data Loading Error'); });

    }
});
}


}


