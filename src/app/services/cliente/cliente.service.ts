import { Injectable, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { ListaClientesGQL, ListaClientesQuery } from './cliente.graphql-gen';
import { Cliente } from '../../../../.src/app/generated/types';
import { FormsService } from '../shared/forms.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';



@Injectable({
    providedIn: 'root'
  })
  export class ClienteService {

  Cliente: Cliente;
  token: string;
  usuario: Usuario;

  constructor ( public router: Router, private ListaClientes: ListaClientesGQL,
                private utiles: FormsService,  public http: HttpClient
                ) {

                    this.token = localStorage.getItem('token');
                    this.usuario = JSON.parse(localStorage.getItem( 'usuario'));


    }               
    


                // METODO ADAPTADO PARA CUMSTONSTORE DEL DATAGRID************************
   getClientes( skip: number, limit: number , orden: string , filter: string ): Promise<ListaClientesQuery> {
   
    return new Promise((resolve, reject) => {
       this.allClientes( skip, limit, orden, filter)
       .subscribe( (resp: ListaClientesQuery) => {
         resolve( resp);
        });
    });

  }


  allClientes( skip: number, limit: number, orden: string = '', filter: any) {
    return this.ListaClientes.watch({
      skip,
      limit,
      orden,
      filter
  },
  {fetchPolicy: 'network-only',
   context: {
      headers: new HttpHeaders({
        authorization: this.token
      })
   }
  })
  .valueChanges
  .pipe(
    map(result => result.data )

  );
  }


  //  TRABAJO CON DEVEXTREME
getStore() {
    const that = this;
  
    return new CustomStore({
      key: '_id',
      load(loadOptions: any) {
  
          const skip: number = loadOptions.skip;
          const limit: number = loadOptions.take;
          const orden: string = '';
          const filter: string = null;
  
          const ola = that.utiles.creaFiltro(loadOptions.filter);
  
        
  
          if (loadOptions.sort) {
            this.orden = '';
            for ( const i in loadOptions.sort) {
              if (loadOptions.sort[i].desc ) {
                this.orden +=  ' -' + loadOptions.sort[i].selector;
               } else {
                this.orden += ' ' + loadOptions.sort[i].selector;
               }
            }
          }
  
  
          return that.getClientes(skip, limit, this.orden, filter )
            .then((data: ListaClientesQuery) => {
  
              return {
              data: data.clientes.cliente,
              totalCount: data.totalCount
             };
  
              })
              .catch(error => {
                console.log( error );
                throw new Error('Data Loading Error'); });
  
      }
  });
  }


  }
  