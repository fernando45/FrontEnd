import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { BrowserStack } from 'protractor/built/driverProviders';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string= 'usuario' ): any {

    let url = URL_SERVICIOS + '/imagenes';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {

      return img;
    }

    switch ( tipo ) {

      case 'usuario':
           url += '/usuarios/' + img;
           break;
      case 'medico':
           url += '/medicos/' + img;
           break;
      case 'hospital':
           url += '/hospitales/' + img;
           break;
      default:
           console.log('tipo de imagen no existe, medicos, usuarios, hospitales');
           url += '/usuarios/xxx';

    }
    return url;
  }

}
