import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if( !this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
          .subscribe();
  }

  seleccionImagen( archivo: File ) {

  if( !archivo ) {
    this.imagenSubir = null;
    return;
  }

  if( archivo.type.indexOf('image') < 0) {

    Swal.fire({
      title: 'Solo imagenes',
      text: 'El tipo seleccionado no es un a imagen',
      type: 'error',
      confirmButtonText: 'Cool'
    });
    this.imagenSubir = null;
    return;  }

  this.imagenSubir = archivo;
  let reader = new FileReader();
  let urlImagenTemp = reader.readAsDataURL( archivo );


  reader.onloadend = () => this.imagenTemp = reader.result.toString();

}

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);

  }

}
