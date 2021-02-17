import { Component, OnDestroy, HostListener } from '@angular/core';
import { SettingsService } from './services/services.index';
import { UsuarioService } from './services/usuario/usuario.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  // tslint:disable-next-line:variable-name
  constructor( _ajustes: SettingsService, private cierreUser: UsuarioService) {

  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {   

    await this.cierreUser.logout();
  }


}
