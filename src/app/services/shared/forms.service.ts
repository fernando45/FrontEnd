import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  public 
  creaFiltro(filter: Array<string>) {
    console.log (filter);

    return 'Tocamela';

  }
}
