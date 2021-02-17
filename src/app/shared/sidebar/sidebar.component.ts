import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';
import { User } from '../../../../.src/app/generated/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: User;

  // tslint:disable-next-line:variable-name
  constructor( public _sidebar: SidebarService,
               public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

}
