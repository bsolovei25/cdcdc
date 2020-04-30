import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-oil-operations-line-chart',
  templateUrl: './oil-operations-line-chart.component.html',
  styleUrls: ['./oil-operations-line-chart.component.scss']
})
export class OilOperationsLineChartComponent implements OnInit {
  @Output() public closeLineChart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeLineChart.emit(false);
  }

}
