import { Component, OnInit } from '@angular/core';
import { newArray } from "@angular/compiler/src/util";

@Component({
  selector: 'evj-kpe-charts-analytic-bar-chart',
  templateUrl: './kpe-charts-analytic-bar-chart.component.html',
  styleUrls: ['./kpe-charts-analytic-bar-chart.component.scss']
})
export class KpeChartsAnalyticBarChartComponent implements OnInit {
    monthDays: number = 30;
    days: number[] = newArray(this.monthDays);
    chosenDay: number = 0;
    public value: number = 300;
    constructor(
    ) {
    }

    public ngOnInit(): void {
    }

    public chooseDay(day: number): void {
        this.chosenDay = day + 1;
    }
}

