import { Component, Input, OnInit } from "@angular/core";
import { IKpeUniversalCardLineChart } from "../../kpe-universal-card.component";

@Component({
    selector: 'evj-kpe-universal-card-line-chart',
    templateUrl: './kpe-universal-card-line-chart.component.html',
    styleUrls: ['./kpe-universal-card-line-chart.component.scss'],
})
export class KpeUniversalCardLineChartComponent implements OnInit {
    @Input() set data(item: IKpeUniversalCardLineChart) {
        this.chartValues = item;
    }
    public chartData: {
        blueBold: {
            percent: number;
            left: number;
        },
        blueLightBold: {
            percent: number;
            left: number;
        },
        greenBold: {
            percent: number;
            left: number;
        },
        orangeBold: {
            percent: number;
            left: number;
        },
        orangeThin: {
            percent: number;
            left: number;
        },
        greenThin: {
            percent: number;
            left: number;
        },
        lightThin: {
            percent: number;
            left: number;
        }
    } = {
        blueBold: {
            percent: 50,
            left: 0,
        },
        blueLightBold: {
            percent: 80,
            left: 0,
        },
        greenBold: {
            percent: 10,
            left: 50,
        },
        orangeBold: {
            percent: 0,
            left: 0,
        },
        orangeThin: {
            percent: 0,
            left: 0,
        },
        greenThin: {
            percent: 20,
            left: 80,
        },
        lightThin: {
            percent: 20,
            left: 60,
        }
    };

    public chartValues: IKpeUniversalCardLineChart;

    constructor() {}

    ngOnInit(): void {}
}
