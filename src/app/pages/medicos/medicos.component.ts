import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/services.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos()
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
        .subscribe( medicos => this.medicos = medicos);
  }

  editarMedico() {

  }

  borrarMedico( medico: Medico) {

    Swal.fire({
      title: 'Estás seguro?',
      text: 'Quires eliminar el médico ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.value) {

        this._medicoService.borrarMedico(medico._id)
          .subscribe(borrado => {

            Swal.fire(
              'Borrado!',
              'El medico ha sido eliminado.',
              'success'
            );
            this.cargarMedicos();
          });
      }
    });
  }


  buscarMedico( termino: string ) {
    if( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
      .subscribe( medicos => this.medicos = medicos);

  }

  crearMedico() {

  }

}
