import { Component, Input, OnInit } from "@angular/core";
import { kpeBarChartData } from "./kpe-charts-analytic-bar-chart.mock";
import { IChartsAnalyticDataset } from "../kpe-charts-analytic-main-chart/kpe-charts-analytic-main-chart.component";

export interface IBarChartDataset {
    x: Date;
    y: number;
}

export interface Interval {
    min: Date | null;
    max: Date | null
}

@Component({
    selector: "evj-kpe-charts-analytic-bar-chart",
    templateUrl: "./kpe-charts-analytic-bar-chart.component.html",
    styleUrls: ["./kpe-charts-analytic-bar-chart.component.scss"]
})

export class KpeChartsAnalyticBarChartComponent implements OnInit {
    @Input() public data: IBarChartDataset[] = kpeBarChartData;
    @Input() public interval: Interval = {
        min: new Date(1626208000000),
        max: new Date(1626308080000)
    };

    public dataToDisplay: IBarChartDataset[];
    public chosenDay: number = 0;
    public scale: number = 0.0405

    constructor() {
    }

    public ngOnInit(): void {
        this.intervalHandler(this.data, this.interval);
        this.dataInInteval(this.data, this.interval);
    }

    // Приводим графики к заданному интервалу
    private dataInInteval(
        dataset: IBarChartDataset[],
        interval: Interval
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

    // Дискретизация
    public intervalHandler(
        dataset: IBarChartDataset[],
        interval: Interval
    ): IBarChartDataset[] {
        const delta: number = +interval.max - +interval.min;
        let result = [];
        let sum: number = 0;

        if (delta < 86401000) {
            this.dataInInteval(dataset, interval).forEach((value) => {
                result.push({
                    y: value.y,
                    x: value.x.getHours()
                });
            });
        } else if (delta > 86401000 && delta <= 3110400000) {
            this.dataInInteval(dataset, interval).forEach((value) => {
                result.push({
                    y: value.y,
                    x: value.x.getDate()
                });
            });
        } else if (delta > 3110400000 && delta < 31556926000) {
            this.dataInInteval(dataset, interval).forEach((value) => {
                result.push({
                    y: value.y,
                    x: value.x.getMonth()
                });
            });
        } else {
            this.dataInInteval(dataset, interval).forEach((value) => {
                result.push({
                    y: value.y,
                    x: value.x.getFullYear()
                });
            });
        }

        this.dataToDisplay = [];
        this.groupBy(result, "x").forEach((value) => {
            sum = 0;
            value.forEach(v => {
                sum += v.y;
            });
            this.dataToDisplay.push({
                x: value[0].x,
                y: sum / value.length
            });
        });
        return this.dataToDisplay;
    }

    public chooseDay(day: number): void {
        this.chosenDay = day + 1;
    }

    // группирока данных по нужной дискретности
    public groupBy(array, property) {
        return array.reduce(function(memo, x) {
            if (!memo[x[property]]) {
                memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
        }, []);
    }
}

