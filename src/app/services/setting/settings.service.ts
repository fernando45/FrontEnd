import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // tslint:disable-next-line:variable-name
  constructor( @Inject(DOCUMENT) private _document) {
    this.cargaAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargaAjustes() {
    if (localStorage.getItem('ajustes')) {
        this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
        this.aplicarTema( this.ajustes.tema );
    }
  }
  aplicarTema( tema: string ) {
    const url: string = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;

}
