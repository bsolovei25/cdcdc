import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/LCO/production-trends.model';
import { IPointTank } from '@shared/models/smart-scroll.model';
import { ReasonsDeviationsService } from '../../reasons-deviations.service';
import { IOilTransfer } from '../../../../../dashboard/models/oil-operations';

export interface IReasonsDeviationsRawData {
    name: string;
    graph: {
        date: Date;
        value: number;
        direction: 'in' | 'out';
        state: 'start' | 'end';
    }[];
}

@Component({
    selector: 'evj-reasons-deviations-line-chart',
    templateUrl: './reasons-deviations-line-chart.component.html',
    styleUrls: ['./reasons-deviations-line-chart.component.scss'],
})
export class ReasonsDeviationsLineChartComponent implements OnChanges {
    @Input()
    private transfer: IOilTransfer | null = null;

    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [],
        },
    ];

    public points: IPointTank[] = [];

    constructor(private reasonsDeviationsService: ReasonsDeviationsService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.getData();
    }

    private async getData(): Promise<void> {
        this.data[0].graph = [];
        this.points = [];
        const rawData = await this.getRawData();
        rawData?.graph.forEach((item) => {
            this.data[0].graph.push({ value: item.value, timeStamp: new Date(item.date) });
            this.points.push({
                value: item.value,
                timestamp: new Date(item.date),
                additional: {
                    card: {
                        title: '',
                        objectType: 'tank',
                        direction: item.direction === 'in' ? 'Приемник' : 'Источник',
                    },
                },
            });
        });
        console.log(this.data, 'this.data');
        console.log(this.points, 'this.points');
    }

    private async getRawData(): Promise<IReasonsDeviationsRawData | null> {
        if (this.transfer) {
            return await this.reasonsDeviationsService.getChartData<IReasonsDeviationsRawData>(
                this.transfer.id,
                this.transfer.startTime,
                this.transfer.endTime
            );
        }
        return null;
    }
}
