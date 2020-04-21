import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-production-trend-graph',
  templateUrl: './production-trend-graph.component.html',
  styleUrls: ['./production-trend-graph.component.scss']
})
export class ProductionTrendGraphComponent implements OnInit {

    public width: number = 20;
    public left: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

}
