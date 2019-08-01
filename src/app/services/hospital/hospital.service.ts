import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  totalHospitales: number = 0;


  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {


  }



  cargarHospitales( ) {
    const url = URL_SERVICIOS + '/hospital' ;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
        this.totalHospitales = resp.total;
        
        return resp.hospitales;
      }));


  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url )
      .pipe(map((resp: any) => resp.hospital));


  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token ;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {

          Swal.fire({
            title: 'Hospital borrado',
           // text: this.hospital.nombre,
            type: 'success',
            confirmButtonText: 'Cool'
          });

    }));
  }



  crearHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, hospital)
      .pipe(
        map((resp: any) => {

          Swal.fire({
            title: 'Hospital creado',
            text:  hospital.nombre,
            type: 'success',
            confirmButtonText: 'Cool'

          });

          return resp.hospital;

        }));


  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitales));

  }

  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .pipe(
        map((resp: any) => {

          Swal.fire({
            title: 'Hospital actualizado',
            text: hospital.nombre,
            type: 'success',
            confirmButtonText: 'Cool'
          });
          return resp.hospital;
        }));

  }

}
