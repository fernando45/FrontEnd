import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales( ) {

    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales);
  }
  cambiarDesde(valor: number) {

    const desde = this.desde + valor;


    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }
  crearHospital() {
    Swal.fire({
      title: 'Introducca el nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',

    }).then((result) => {
      if (result.value) {

        const hospital = new Hospital( result.value);

        this._hospitalService.crearHospital(hospital)
          .subscribe(() => this.cargarHospitales() );

      }
    });

  }


  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
      .subscribe(hospitales => this.hospitales = hospitales);
    this.cargando = false;
  }

  borrarHospital(hospital: Hospital) {

    Swal.fire({
      title: 'Estás seguro?',
      text: 'Quires eliminar el hospital ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.value) {

        this._hospitalService.borrarHospital(hospital._id)
          .subscribe(borrado => {

            Swal.fire(
              'Borrado!',
              'El hospital ha sido eliminado.',
              'success'
            );
            this.cargarHospitales();
          });
      }
    });
  }

  guardarHospital( hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
      .subscribe();

  }
  actualizarImagen(hospital: Hospital) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
