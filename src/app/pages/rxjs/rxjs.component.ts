import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    suscription: Subscription;

  constructor() {


    this.suscription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'sus', numero ),
      error => console.error('Error en el obs', error ),
      () => console.log( 'El observador termino.' )
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();

  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);
       //  if (contador === 3) {
        //  clearInterval(intervalo);
        //  observer.complete();
        // }
        // if (contador === 2) {
          // clearInterval(intervalo);
         // observer.error('Auxilio');
         // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter ( (valor, index ) => {
        if ( ( valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // impar
          return false;
        }

      })

    );



  }


}
