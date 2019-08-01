import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: []
})
export class Graficas1Component implements OnInit {

  graficos: any = {
       grafico1: {
        labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
        data: [20, 30, 50],
        type: 'pie',
        leyenda: 'El pan se come con'
      },
      grafico2: {
        labels: ['Hombres', 'Mujeres'],
        data: [4500, 6000],
        type: 'pie',
        leyenda: 'Entrevistados'
      },
      grafico3: {
        labels: ['Si', 'No'],
        data: [95, 5],
        type: 'pie',
        leyenda: '¿Le dan gases los frijoles?'
      },
      grafico4: {
        labels: ['No', 'Si'],
        data: [85, 15],
        type: 'pie',
        leyenda: '¿Le importa que le den gases?'
      },
    };

  constructor() {

   }

  ngOnInit() {
    // console.log( this.graficos.grafico1);
  }

}
