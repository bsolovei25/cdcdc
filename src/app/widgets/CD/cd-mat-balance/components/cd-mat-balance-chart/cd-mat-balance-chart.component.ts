import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
    ISplineDiagramData,
    ISplineDiagramSize,
} from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { HttpClient } from '@angular/common/http';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { CdMatBalanceChartCardComponent } from '../cd-mat-balance-chart-card/cd-mat-balance-chart-card.component';

@Component({
    selector: 'evj-cd-mat-balance-chart',
    templateUrl: './cd-mat-balance-chart.component.html',
    styleUrls: ['./cd-mat-balance-chart.component.scss'],
})
export class CdMatBalanceChartComponent implements OnInit, OnDestroy {
    public readonly chartComponent: typeof CdMatBalanceChartCardComponent = CdMatBalanceChartCardComponent;

    private subscriptions: Subscription[] = [];

    allCheckedCharts: string[] = [];
    matBalanceWidgetId: string;

    @Input()
    public widgetId: string = null;

    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public size: ISplineDiagramSize = null;

    public toggleAreaValue: boolean = false;
    @Output() toggleAreaChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get toggleArea(): boolean {
        return this.toggleAreaValue;
    }

    set toggleArea(val: boolean) {
        this.toggleAreaValue = val;
        this.toggleAreaChange.emit(this.toggleAreaValue);
    }

    // выбор интервала отображаемого времени
    get hoursCount(): 8 | 24 {
        return this.cdMatBalanceService.hc$.getValue();
    }

    set hoursCount(param: 8 | 24) {
        this.cdMatBalanceService.hc$.next(param);
    }

    public hoursLine: number[] = [];
    public currentDate: Date;

    public readonly selectValues: { value: number; title: string }[] = [
        {
            value: 8,
            title: '8 часов',
        },
        {
            value: 24,
            title: '24 часа',
        },
    ];

    public isMenuOpen: boolean = false;

    constructor(
        public http: HttpClient,
        private cdMatBalanceService: CdMatBalanceService,
        public widgetService: WidgetService,
        public injector: Injector
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.cdMatBalanceService.charts$.subscribe((charts) => {
                this.allCheckedCharts = charts;
            }),
            this.cdMatBalanceService.showDeviation.subscribe((value) => {
                if (value) {
                    this.toggleAreaValue = true;
                }
            }),
            combineLatest([this.cdMatBalanceService.hc$, this.cdMatBalanceService.currentHour$]).subscribe(
                ([hc, currentHour]) => {
                    const begin: number = currentHour - (hc - 1);
                    const end: number = currentHour + 2;
                    this.hoursLine = [];
                    this.currentDate = new Date();
                    for (let i = begin; i < end; i++) {
                        const insert = i > 0 ? i : 24 + i;
                        this.hoursLine.push(insert);
                    }
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public getInjector = (idWidget: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: idWidget },
                { provide: 'channelId', useValue: channelId },
            ],
            parent: this.injector,
        });
    };

    /**
     * @deprecated
     */
    private async onStart(): Promise<void> {
        const hourInterval = 8;
        const currentDatetime = this.dateHourRound(new Date());
        const startDatetime = this.dateHourRound(
            new Date(new Date().setHours(new Date().getHours() - (hourInterval - 1)))
        );
        // TODO sort array
        let testData: { value: number; timestamp: Date }[] = [];
        for (let i = 0; i < 100; i++) {
            if (i === 49) {
                continue;
            }
            if (i === 50) {
                testData.push({
                    value: 0,
                    timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50))),
                });
            }
            testData.push({
                value: i,
                timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50))),
            });
        }
        testData.forEach((el) => (el.timestamp = this.dateHourRound(el.timestamp)));
        testData = testData.filter(
            (el) =>
                el.timestamp.getTime() >= startDatetime.getTime() && el.timestamp.getTime() <= currentDatetime.getTime()
        );

        const normArray: { value: number; timestamp: Date }[] = [];
        for (const el of testData) {
            if (normArray.find((res) => res.timestamp.getTime() === el.timestamp.getTime())) {
                continue;
            }
            const filterValues = testData
                .filter((res) => res.timestamp.getTime() === el.timestamp.getTime())
                .map((res) => res.value);
            const resultValue =
                filterValues.map((res) => res).reduce((prev, next) => prev + next) / filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number; y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000),
            };
        });
    }

    /**
     * @deprecated
     */
    private async getData(): Promise<void> {
        try {
            const data: ISplineDiagramData = await this.http
                .get<ISplineDiagramData>('assets/mock/LCO/spline-trends-chart.json')
                .toPromise();
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
        } catch (error) {
            console.error(error);
        }
    }

    dateHourRound(date: Date): Date {
        return new Date(date.getTime() - (date.getTime() % (60 * 60 * 1000)));
    }

    private fillArray(data: { x: number; y: number }[], count: number): { x: number; y: number }[] {
        function getPrev(idx: number): { x: number; y: number } {
            const filterArray = data.filter((el) => el.x < idx);
            return filterArray.length > 0 ? filterArray[filterArray.length - 1] : null;
        }

        function getNext(idx: number): { x: number; y: number } {
            const filterArray = data.filter((el) => el.x > idx);
            return filterArray.length > 0 ? filterArray[0] : null;
        }

        const dataArray: { x: number; y: number }[] = [];
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
                    y: prev.y + ((idx + 1 - prev.x) / (next.x - prev.x)) * (next.y - prev.y),
                };
            }
            dataArray[idx] = el;
        });
        return dataArray;
    }

    onClickHeader(): void {
        this.toggleAreaValue = false;
        this.cdMatBalanceService.showDeviation.next(null);
        this.cdMatBalanceService.charts$.next([]);
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    public closeMenu(): void {
        this.isMenuOpen = false;
    }
}
