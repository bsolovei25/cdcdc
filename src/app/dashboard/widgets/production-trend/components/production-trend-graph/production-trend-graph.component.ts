import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-production-trend-graph',
  templateUrl: './production-trend-graph.component.html',
  styleUrls: ['./production-trend-graph.component.scss']
})
export class ProductionTrendGraphComponent implements OnInit {

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() { }

    ngOnInit(): void {
    }

}
