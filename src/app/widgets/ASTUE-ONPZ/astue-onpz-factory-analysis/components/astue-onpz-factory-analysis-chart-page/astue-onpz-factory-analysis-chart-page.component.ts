import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IDatesInterval } from '../../../../../dashboard/services/widget.service';
import { IChartMini } from '@shared/models/smart-scroll.model';
import { IMultiChartLine } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-chart-page',
    templateUrl: './astue-onpz-factory-analysis-chart-page.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-chart-page.component.scss']
})
export class AstueOnpzFactoryAnalysisChartPageComponent implements OnInit, OnChanges {

    @Input()
    public graphData: { name: string; graph: IMultiChartLine[]; } = {name: '', graph: [],};

    @Input()
    public selectedPeriod: IDatesInterval | null = null;

    public sbLeft: number = 0;

    public sbWidth: number = 100;

    public scrollData: IChartMini[] = [];

    ngOnChanges(): void {
        if (!this.selectedPeriod) {
            const now = new Date();
            now.setMinutes(0, 0, 0);
            this.selectedPeriod = {
                fromDateTime: new Date(now.getTime() - 24 * 1000 * 60 * 60),
                toDateTime: new Date(now.getTime() + 72 * 1000 * 60 * 60),
            };
        } else {
            this.selectedPeriod.fromDateTime = new Date(this.selectedPeriod.fromDateTime);
            this.selectedPeriod.toDateTime = new Date(this.selectedPeriod.toDateTime);
        }

        this.scrollData = this.graphData?.graph?.find((item) => item.graphType === 'plan')?.graph.map(item => {
            return {
                value: item.value,
                timeStamp: new Date(item.timeStamp),
            };
        });
    }

    constructor() {
    }

    ngOnInit(): void {
    }


    public scrollHandler(): void {
        const reqDateTimeInterval = this.extractScrollDateTimes(
            this.selectedPeriod,
            this.sbWidth,
            this.sbLeft
        );
        // this.selectedPeriod = reqDateTimeInterval;
    }

    private extractScrollDateTimes(
        dateTimeInterval: IDatesInterval,
        width: number,
        left: number
    ): IDatesInterval {
        if (!dateTimeInterval || width === null || left === null) {
            console.error('extractScrollDateTimes: No valid params');
            return null;
        }
        const timeInterval = {
            from: dateTimeInterval.fromDateTime.getTime(),
            to: dateTimeInterval.toDateTime.getTime(),
        };

        function getByPercent(value: number): number {
            return ((timeInterval.to - timeInterval.from) * value) / 100;
        }

        return {
            fromDateTime: new Date(timeInterval.from + getByPercent(left)),
            toDateTime: new Date(timeInterval.from + getByPercent(width + left)),
        };
    }
}
