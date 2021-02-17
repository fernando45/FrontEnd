import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { UserQuery } from '../../services/usuario/usuario.graphql-gen';
import { DxDataGridComponent } from 'devextreme-angular';
import { User} from '../../../../.src/app/generated/types';
import { UsuarioComponent } from './usuario.component';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UsuariosComponent implements OnInit,  OnDestroy {

   dataSource: any = {};
   refres: any;
   choser: boolean = false;

   FilterPanel: boolean = false;
   BuscarPanel: boolean = false;


   AccionBarra: string;
   popupVisible: boolean = false;
   selec: string = 'single';

   selectedRows: string[];

   usuario: User;
   private eliminaSub: Subscription = null;


   @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;
   @ViewChild(UsuarioComponent) forma: UsuarioComponent;


    // tslint:disable-next-line: variable-name
    constructor( public _usuarioService: UsuarioService,
                 // tslint:disable-next-line: variable-name
                 public _modalUploadService: ModalUploadService,
                 private cdRef: ChangeDetectorRef) {

                  this.dataSource = this._usuarioService.getStore();

  }

    accionBarraGrid($event) {

      switch ($event) {

        case 'nuevo':
          this.nuevoUsuario();
          break;
        case 'editar':
          this.editaUsuario();
          break;
        case 'borrar':
          this.borrarUsuario();
          break;
        case 'duplicar':
          break;
        case 'refrescar':
          this.grid.instance.refresh();
          break;
        case 'exportar':
          this.grid.instance.exportToExcel(false);
          break;
        case 'columnas':
          this.grid.instance.showColumnChooser();
          console.log('columnas');
          break;
        case 'filtros':
            if (this.FilterPanel) {
              this.FilterPanel = false;
            } else {
              this.FilterPanel = true;
            }
            this.grid.instance.repaint();
            break;

        case 'buscar':

            if (this.BuscarPanel) {
              this.BuscarPanel = false;
            } else {
              this.BuscarPanel = true;
            }
            this.grid.instance.repaint();
            break;
        case 'multiple':
            if (this.selec === 'multiple') {
              this.selec = 'single';
            } else {
              this.selec = 'multiple';
            }
            this.grid.instance.repaint();
            break;
      }
    }



    accionUsuario( $event ) {
      const result: boolean = $event;
      if ( result ) { this.grid.instance.refresh(); }

    }

    nuevoUsuario() {
      this.forma.nuevoUsuario();
    }

    editaUsuario() {

      if (this.selec === 'multiple') {
        Swal.fire({
          title: '!No puedo hacer lo que me pides¡',
          text: 'Está seleccionado el modo múltiple.',
          type: 'warning',
          confirmButtonText: 'Continua'
        });
      }
      const id: string = this.selectedRows[0];
      this.forma.Actualiza( id );
    }

    borrarUsuario() {
      if (this.selec === 'multiple') {
        Swal.fire({
          title: '!No puedo hacer lo que me pides¡',
          text: 'Está seleccionado el modo múltiple.',
          type: 'warning',
          confirmButtonText: 'Continua'
        });
      }
      Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción no es reversible.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
      }).then((result) => {
        if (result.value) {
        const id: string = this.selectedRows[0];
        this.eliminaSub = this._usuarioService.borrarUsuario( id )
            .subscribe(resp => {});
        this.grid.instance.refresh();
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });


    }

    cierraForm() {
    }

 


  ngOnInit() {

      this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  ngOnDestroy() {
      this.grid.instance.clearFilter();
  }
  mostrarModal( id: string ) {


      this._modalUploadService.mostrarModal( 'usuarios', id );
  }

cargarUsuarios() {

        return this._usuarioService.allUser(0, 9, '', '' )
            .subscribe( resp => {
              console.log( resp.totalCount);            });

    }
cargaUsuario( id: string ) {
    return this._usuarioService.getUser( id )
        .subscribe( (resp: UserQuery) => {
          this.usuario = resp.userPorId.user;
        });
}


buscarUsuario( termino: string ) {


    }



  }

