import {Component, Input, OnInit} from '@angular/core';
import {LineChartOptions} from "../../models/line-chart-options";

@Component({
  selector: 'evj-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() options: LineChartOptions;
  @Input() size?: string;

  constructor() {
  }

  ngOnInit() {
  }

}
