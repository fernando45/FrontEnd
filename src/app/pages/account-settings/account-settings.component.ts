import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  [x: string]: any;

  // tslint:disable-next-line:variable-name
  constructor(// tslint:disable-next-line:variable-name
               public _ajustes: SettingsService ) { }


  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {
      // tslint:disable-next-line: prefer-const
      this.aplicarCheck( link );
      this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any) {

     // tslint:disable-next-line: prefer-const
    let selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores) {
        ref.classList.remove('working');
    }

    link.classList.add('working');
    }

    colocarCheck() {
      // tslint:disable-next-line: prefer-const
      let selectores: any = document.getElementsByClassName('selector');
      const tema = this._ajustes.ajustes.tema;

      for (const ref of selectores) {
        if ( ref.getAttribute('data-theme') === tema ) {
          ref.classList.add('working');
          break;
        }
      }
    }

}
