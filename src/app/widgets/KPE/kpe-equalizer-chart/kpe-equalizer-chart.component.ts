import { Component, Input } from '@angular/core';

export interface IKpeEqualizerInputData {
    name: string;
    comment?: string;
    chartData: IKpeEqualizerChartData[];
}

export interface IKpeEqualizerChartData {
    barSize: number;
    valueSize?: number;
    overSize?: number;
}

@Component({
    selector: 'evj-kpe-equalizer-chart',
    templateUrl: './kpe-equalizer-chart.component.html',
    styleUrls: ['./kpe-equalizer-chart.component.scss'],
})
export class KpeEqualizerChartComponent {
    @Input()
    public data: IKpeEqualizerInputData = {
        name: 'Рефлюкс',
        comment: 'норма по м/д углев-ов С5+',
        chartData: [
            {
                barSize: 10,
                valueSize: 10,
                overSize: 0,
            },
            {
                barSize: 15,
                valueSize: 12,
                overSize: 3,
            },
            {
                barSize: 12,
                valueSize: 11,
                overSize: 1,
            },
            {
                barSize: 10,
                valueSize: 10,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 10,
                overSize: 3,
            },
            {
                barSize: 11,
                valueSize: 11,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 12,
                overSize: 1,
            },
            {
                barSize: 12,
                valueSize: 12,
                overSize: 0,
            },
            {
                barSize: 11,
                valueSize: 11,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 12,
                overSize: 1,
            },
            {
                barSize: 15,
                valueSize: 13,
                overSize: 2,
            },
            {
                barSize: 11,
                valueSize: 11,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 13,
                overSize: 0,
            },
            {
                barSize: 12,
                valueSize: 12,
                overSize: 0,
            },
            {
                barSize: 10,
                valueSize: 10,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 0,
                overSize: 0,
            },
            {
                barSize: 12,
                valueSize: 0,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 0,
                overSize: 0,
            },
            {
                barSize: 10,
                valueSize: 0,
                overSize: 0,
            },
            {
                barSize: 12,
                valueSize: 0,
                overSize: 0,
            },
            {
                barSize: 13,
                valueSize: 0,
                overSize: 0,
            }
        ]
    };

    constructor() {
    }
}
