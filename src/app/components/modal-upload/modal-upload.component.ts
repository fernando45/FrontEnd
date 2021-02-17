import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  noImagen: string = 'https://res.cloudinary.com/djuaqqcwq/image/upload/v1578738225/no-img_sb5wsf.jpg';



  constructor(
    public _subirArchivoAervice: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultalModal();

  }
  mostrarModal() {

  }


  subirImagen() {
    this._subirArchivoAervice.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
                .then( resp => {
                  this._modalUploadService.notificacion.emit( resp );
                  this.cerrarModal();
                })
                .catch( err => {
                  console.log('error en la carga');
                });
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {

      Swal.fire({
        title: 'Solo imagenes',
        text: 'El tipo seleccionado no es un a imagen',
        type: 'error',
        confirmButtonText: 'Cool'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);


    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

}
