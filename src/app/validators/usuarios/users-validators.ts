import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UsersValidator {

  constructor( ) { }


   emailExist( control: FormControl ): Observable<ValidationErrors> {

    if ( !control.dirty ) {
      return  new Observable( (subscriber)  => {
      subscriber.next(null);
      subscriber.complete();
    });

  }
    return new Observable( (subscriber ) => {

      const service: any = this;
      service.getUserPorEmail( control.value ).subscribe( data => {

            if ( data.userPorEmail.status === true ) {
                subscriber.next({emailExist: true});
            } else {
                subscriber.next(null);
            }
            subscriber.complete();
      });

    });
}


}
