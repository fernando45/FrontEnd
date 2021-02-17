import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { User } from '../../../../.src/app/generated/types';

//const path = require('path');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: User;

  constructor( public _USUARIOSERVICE: UsuarioService,
               public router: Router) { }

  ngOnInit() {
    this.usuario = this._USUARIOSERVICE.usuario;
  }

  buscar( termino: string ) {
    this.router.navigate( ['/busqueda', termino]);
  }

}
