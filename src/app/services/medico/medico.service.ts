import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { resolvePtr } from 'dns';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { pipe } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0 ;

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService,
               ) { }
  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.medico));

  }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }
  buscarMedicos(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url);

  }

  guardarMedico( medico: Medico ) {
   
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando

      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
        .pipe(map((resp: any) => {
          Swal.fire({
            title: 'Medico actualizado',
            text: medico.nombre,
            type: 'success',
            confirmButtonText: 'Cool'
          });

          return resp.medico;

        }));

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico)
        .pipe(map ( (resp: any) => {
          Swal.fire({
            title: 'Medico creado',
            text: medico.nombre,
            type: 'success',
            confirmButtonText: 'Cool'
          });

          return resp.medico;
        }));
    }



  }
}
