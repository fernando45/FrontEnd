import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() graficos: any;

 // public leyenda: string;
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';

  public pieChartColors: Array<any> = [];

  constructor() { }


  ngOnInit() {

    this.pieChartLabels = this.graficos.labels;
    this.pieChartData = this.graficos.data;
    this.pieChartType = this.graficos.type;
    this.pieChartColors = this.graficos.colors;

  }


}
