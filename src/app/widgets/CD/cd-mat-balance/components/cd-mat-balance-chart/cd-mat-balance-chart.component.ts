import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    ISplineDiagramData,
    ISplineDiagramSize
} from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { HttpClient } from '@angular/common/http';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { WIDGETS } from '../../../../../dashboard/components/widgets-grid/widget-map';
import { Subscription } from 'rxjs';
import { IWidget } from '../../../../../dashboard/models/widget.model';

@Component({
    selector: 'evj-cd-mat-balance-chart',
    templateUrl: './cd-mat-balance-chart.component.html',
    styleUrls: ['./cd-mat-balance-chart.component.scss']
})
export class CdMatBalanceChartComponent implements OnInit, OnDestroy, AfterViewInit {
    public readonly WIDGETS = WIDGETS;

    private subscriptions: Subscription[] = [];

    allCheckedCharts: string[] = [];
    allWidgets: IWidget[] = [];

    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public size: ISplineDiagramSize = null;

    public hoursCount: 8 | 24 = 8;

    public readonly selectValues: { value: number; title: string }[] = [
        {
            value: 8,
            title: '8 часов'
        },
        {
            value: 24,
            title: '24 часа'
        }
    ];

    public isMenuOpen: boolean = false;

    constructor(
        public http: HttpClient,
        private cdMatBalanceService: CdMatBalanceService,
        public widgetService: WidgetService,
        public injector: Injector,
        private chDet: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.onStart();
        this.subscriptions.push(
            this.cdMatBalanceService.charts$.subscribe((charts) => {
                this.allWidgets = [];
                const allWidgetsLoc = this.widgetService.allWidgets;
                charts.forEach((chart) => {
                    allWidgetsLoc.forEach((value) => {
                        if (value.name === chart) {
                            this.allWidgets.push(value);
                        }
                    });
                });
                this.allCheckedCharts = charts;
                this.chDet.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        // this.onStart();
    }

    ngAfterViewInit(): void {
        // this.getData();
    }

    public getInjector = (idWidget: string, uniqId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: idWidget },
                { provide: 'uniqId', useValue: uniqId },
                { provide: 'isMock', useValue: false }
            ],
            parent: this.injector
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
                    timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50)))
                });
            }
            testData.push({
                value: i,
                timestamp: new Date(new Date().setHours(new Date().getHours() + (i - 50)))
            });
        }
        testData.forEach((el) => (el.timestamp = this.dateHourRound(el.timestamp)));
        testData = testData.filter(
            (el) =>
                el.timestamp.getTime() >= startDatetime.getTime() &&
                el.timestamp.getTime() <= currentDatetime.getTime()
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
                filterValues.map((res) => res).reduce((prev, next) => prev + next) /
                filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number; y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000)
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
                    y: prev.y + ((idx + 1 - prev.x) / (next.x - prev.x)) * (next.y - prev.y)
                };
            }
            dataArray[idx] = el;
        });
        return dataArray;
    }

    onClickHeader(): void {
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
