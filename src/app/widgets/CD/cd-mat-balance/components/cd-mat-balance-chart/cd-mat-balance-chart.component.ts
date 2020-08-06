import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    ISplineDiagramData,
    ISplineDiagramSize
} from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { HttpClient } from '@angular/common/http';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';

@Component({
    selector: 'evj-cd-mat-balance-chart',
    templateUrl: './cd-mat-balance-chart.component.html',
    styleUrls: ['./cd-mat-balance-chart.component.scss']
})
export class CdMatBalanceChartComponent implements OnInit, AfterViewInit {

    @ViewChild('chart')
    public chartElement: ElementRef;

    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public size: ISplineDiagramSize = null;

    public isMenuOpen: boolean = false;

    constructor(public http: HttpClient,
                private cdMatBalanceService: CdMatBalanceService) {
    }

    ngOnInit(): void {
        const hourInterval = 8;
        const currentDatetime = this.dateHourRound(new Date());
        const startDatetime = this.dateHourRound(new Date(new Date().setHours(new Date().getHours() - (hourInterval - 1))));
        // TODO sort array
        let testData: { value: number; timestamp: Date }[] = [];
        for (let i = 0; i < 100; i++) {
            if (i === 49) {
                continue;
            }

            if (i === 50) {
                testData.push({
                    value: 0,
                    timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50)))
                });
            }
            testData.push({
                value: i,
                timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50)))
            });
        }
        console.log(testData);
        testData.forEach(el => el.timestamp = this.dateHourRound(el.timestamp));
        testData = testData.filter(el => el.timestamp.getTime() >= startDatetime.getTime() && el.timestamp.getTime() <= currentDatetime.getTime());
        console.log(testData);

        const normArray: { value: number; timestamp: Date }[] = [];
        for (const el of testData) {
            if (normArray.find(res => res.timestamp.getTime() === el.timestamp.getTime())) {
                continue;
            }
            const filterValues = testData.filter(res => res.timestamp.getTime() === el.timestamp.getTime()).map(res => res.value);
            const resultValue = filterValues.map(res => res).reduce((prev, next) => prev + next) / filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number, y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000)
            };
        });

        console.log(resultArray);
    }

    dateHourRound(date: Date): Date {
        return new Date(date.getTime() - date.getTime() % (60 * 60 * 1000));
    }

    ngAfterViewInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight
        };
        this.http
            .get('assets/mock/LCO/spline-trends-chart.json')
            .toPromise()
            .then((data: ISplineDiagramData) => {
                data.plan = data.fact.map((point) => {
                    const newPoint = { ...point };
                    newPoint.y += 2;
                    return newPoint;
                });
                data.highBound = this.fillArray(data.highBound, 30);
                data.lowBound = this.fillArray(data.lowBound, 30);
                data.plan = this.fillArray(data.plan, 30);
                data.plan[8].y -= 4;
                this.data = data;
            });
    }

    private fillArray(data: { x: number, y: number }[], count: number): { x: number, y: number }[] {
        function getPrev(idx: number): { x: number, y: number } {
            const filterArray = data.filter((el) => el.x < idx);
            return filterArray.length > 0 ? filterArray[filterArray.length - 1] : null;
        }

        function getNext(idx: number): { x: number, y: number } {
            const filterArray = data.filter((el) => el.x > idx);
            return filterArray.length > 0 ? filterArray[0] : null;
        }

        const dataArray: { x: number, y: number }[] = [];
        for (let i = 0; i < count; i++) {
            dataArray.push(data.find((el) => el.x === i + 1) ?? null);
        }
        dataArray.forEach((el, idx) => {
            if (el) {
                return;
            }
            const prev = getPrev(idx + 1);
            const next = getNext(idx + 1);
            if (!prev && !next) {
                el = { x: idx + 1, y: 0 };
            } else if (!prev) {
                el = { x: idx + 1, y: next.y };
            } else if (!next) {
                el = { x: idx + 1, y: prev.y };
            } else {
                el = {
                    x: idx + 1,
                    y: prev.y + (idx + 1 - prev.x) / (next.x - prev.x) * (next.y - prev.y)
                };
            }
            dataArray[idx] = el;
        });
        return dataArray;
    }

    onClickHeader(): void {
        this.cdMatBalanceService.showDeviation.next(null);
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    public closeMenu(): void {
        this.isMenuOpen = false;
    }

}
