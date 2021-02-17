
import { Component, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  btMas: any;
  btBorrar: any;
  btEditar: any;
  btDuplicar: any;

  btRefres: any;
  btColumns: any;
  btExport: any;
  btExportSelect: any;


  btBuscar: any;
  btFiltros: any;
  btSelecMultiple: any;


  Multiple: boolean = false;





  @Output() Accion = new EventEmitter<string>();



  constructor(   ) {

    this.btMas = {icon: 'add', stylingMode: 'contained', text: 'nuevo', type: 'default', onClick: () => { this.Accion.emit('nuevo'); }};
    this.btBorrar = {icon: 'remove', stylingMode: 'contained', type: 'danger', onClick: () => { this.Accion.emit('borrar');  }};
    this.btEditar = {icon: 'background', stylingMode: 'contained', type: 'default', onClick: () => { this.Accion.emit('editar');  }};
    this.btDuplicar = {icon: 'copy', stylingMode: 'contained', type: 'default', onClick: () => { this.Accion.emit('duplicar'); }};
    this.btRefres = {icon: 'refresh',  type: 'default' , onClick: () => { this.Accion.emit('refrescar'); }};
    this.btColumns = {icon: 'columnchooser', type: 'default', onClick: () => { this.Accion.emit('columnas'); }};
    this.btExport = {icon: 'xlsfile',  type: 'default', onClick: () => {this.Accion.emit('exportar'); }};
    this.btFiltros = {icon: 'filter', type: 'default', onClick: () => { this.Accion.emit('filtros'); }};
    this.btBuscar = {icon: 'search', type: 'default', onClick: () => { this.Accion.emit('buscar'); }};
    this.btExportSelect = {icon: 'bulletlist', type: 'default', onClick: () => { this.Accion.emit('exportarselect'); }};
    this.btSelecMultiple = {icon: 'selectall', type: 'default', onClick: () => {this.Accion.emit('multiple'); }};

    }




}
