import { Component, Input, OnInit } from "@angular/core";
import { newArray } from "@angular/compiler/src/util";
import { kpeBarChartData } from "./kpe-charts-analytic-bar-chart.mock";
import { IChartsAnalyticDataset } from "../kpe-charts-analytic-main-chart/kpe-charts-analytic-main-chart.component";

export interface IBarChartDataset {
    x: Date;
    y: number;
}

@Component({
  selector: 'evj-kpe-charts-analytic-bar-chart',
  templateUrl: './kpe-charts-analytic-bar-chart.component.html',
  styleUrls: ['./kpe-charts-analytic-bar-chart.component.scss']
})

export class KpeChartsAnalyticBarChartComponent implements OnInit {
    @Input() public data: IBarChartDataset[] = kpeBarChartData;
    @Input() public interval: { min: Date | null; max: Date | null } = {
        min: new Date(1627776000000),
        max: new Date(1628800000000),
    };

    public dataToDisplay: IBarChartDataset[];
    chosenDay: number = 0;
    public value: number = 300;
    constructor(
    ) {
    }

    public ngOnInit(): void {
        console.log(this.dataInInteval(this.data, this.interval));
        console.log(this.data);
        this.dataToDisplay = this.dataInInteval(this.data, this.interval);
    }

    // Приводим графики к заданному интервалу
    private dataInInteval(
        dataset: IBarChartDataset[],
        interval: { min: Date | null; max: Date | null }
    ): IBarChartDataset[] {
        if (
            dataset.length === 0 ||
            +dataset[0] > +interval.max ||
            +dataset[dataset.length - 1] < +interval.min ||
            (dataset.length === 1 && +dataset[0] >= +interval.min && +dataset[0] <= +interval.max)
        ) {
            return [];
        }
        let result: IChartsAnalyticDataset[] = [];
        dataset.forEach((coordinate, index) => {
            if (coordinate.x <= interval.max && coordinate.x >= interval.min) {
                result.push({ x: coordinate.x, y: coordinate.y });
            } else if (coordinate.x > interval.max && dataset[index - 1].x <= interval.max) {
                const k = (coordinate.y - dataset[index - 1].y) / (+coordinate.x - +dataset[index - 1].x);
                const b = coordinate.y - k * +coordinate.x;
                result.push({ x: interval.max, y: k * +interval.max + b });
            } else if (coordinate.x < interval.min && dataset[index + 1].x >= interval.min) {
                const k = (coordinate.y - dataset[index + 1].y) / (+coordinate.x - +dataset[index + 1].x);
                const b = coordinate.y - k * +coordinate.x;
                result = [{ x: interval.min, y: k * +interval.min + b }, ...result];
            }
        });
        return result;
    }

    public chooseDay(day: number): void {
        this.chosenDay = day + 1;
    }
}

