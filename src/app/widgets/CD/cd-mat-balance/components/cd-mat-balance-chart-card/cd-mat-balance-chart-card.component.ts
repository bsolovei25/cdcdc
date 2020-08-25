import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ISplineDiagramData } from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { ISplineDiagramSize } from '../../../cd-shared/cd-line-chart/cd-line-chart.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-cd-mat-balance-chart-card',
    templateUrl: './cd-mat-balance-chart-card.component.html',
    styleUrls: ['./cd-mat-balance-chart-card.component.scss'],
})
export class CdMatBalanceChartCardComponent implements OnInit, AfterViewInit {
    @ViewChild('chart', { static: true })
    public chartElement: ElementRef;

    public data: ISplineDiagramData;
    public size: ISplineDiagramSize;

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight,
        };
    }

    public ngAfterViewInit(): void {
        this.getData();
    }

    private async getData(): Promise<void> {
        const mockData = await this.http.get<any>('assets/mock/CD/model.json').toPromise();
        console.log('mockData', mockData);

        const plan: { value: number; timestamp: Date }[] = mockData.data.modelValueGraphs.map(
            (item) => {
                return {
                    value: item.value ?? 0,
                    timestamp: new Date(item.date),
                };
            }
        );

        const fact: { value: number; timestamp: Date }[] = mockData.data.valueGraphs.map((item) => {
            return {
                value: item.value ?? 0,
                timestamp: new Date(item.date),
            };
        });

        const newData: ISplineDiagramData = {
            deviationValue: mockData.data.deviation,
            planValue: mockData.data.modelValue,
            highBound: [],
            lowBound: [],
            fact: this.transformData(fact),
            plan: this.transformData(plan),
        };

        console.log('newData', newData);
    }

    private dateHourRound(date: Date): Date {
        return new Date(date.getTime() - (date.getTime() % (60 * 60 * 1000)));
    }

    private transformData(data: { value: number; timestamp: Date }[]): { x: number; y: number }[] {
        const normArray: { value: number; timestamp: Date }[] = [];
        for (const el of data) {
            if (normArray.find((res) => res.timestamp.getTime() === el.timestamp.getTime())) {
                continue;
            }
            const filterValues = data
                .filter((res) => res.timestamp.getTime() === el.timestamp.getTime())
                .map((res) => res.value);
            const resultValue =
                filterValues.map((res) => res).reduce((prev, next) => prev + next) /
                filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number; y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000),
            };
        });
        return resultArray;
    }
}
