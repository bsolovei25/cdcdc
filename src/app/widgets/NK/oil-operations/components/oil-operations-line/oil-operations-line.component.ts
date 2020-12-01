import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDatesInterval } from '../../../../../dashboard/services/widget.service';
import { OilOperationsService } from '../../../../../dashboard/services/widgets/oil-operations.service';
import { IProductionTrend } from '../../../../../dashboard/models/LCO/production-trends.model';
import { IOilOperationsTank } from '../../../../../dashboard/models/oil-operations';
import {IPointTank} from "@shared/models/smart-scroll.model";

interface ITankMassChartDataResponse {
    name: 'string';
    graph: {
        date: string,
        value: 0,
    }[];
}

@Component({
    selector: 'evj-oil-operations-line',
    templateUrl: './oil-operations-line.component.html',
    styleUrls: ['./oil-operations-line.component.scss']
})
export class OilOperationsLineComponent implements OnInit {

    @Input()
    public currentDates: IDatesInterval;

    public dates: IDatesInterval;

    public chartData: IProductionTrend[];

    public pointsData: IPointTank[] = [];

    @Input()
    public selectedTank: IOilOperationsTank;

    @Output() closeLineChart: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private oilOperationService: OilOperationsService,) {
    }

    public ngOnInit(): void {
        this.dates = this.currentDates;
        this.getChartData();
    }

    public close(event: boolean): void {
        this.closeLineChart.emit(event);
    }

    public updateDates(dates: IDatesInterval): void {
        this.dates = dates;
    }

    private async getChartData(): Promise<void> {
        const data = await this.oilOperationService.getTankMassChartData<ITankMassChartDataResponse>(this.selectedTank?.id, this.dates.fromDateTime, this.dates.toDateTime);
        const formattedGraphData: { value: number; timeStamp: Date}[] = [];
        data.graph.forEach(item => {
            formattedGraphData.push(
                {
                    value: item.value,
                    timeStamp: new Date(item.date),
                }
            );
            this.pointsData.push({
                value: item.value,
                timestamp: new Date(item.date),
            });
        });
        this.chartData = [
            {
                graphType: 'fact',
                graphStyle: 'main',
                graph: formattedGraphData,
                additional: {
                    tankName: this.selectedTank.name,
                    maxValue: 0,
                },
            }
        ];
    }
}
