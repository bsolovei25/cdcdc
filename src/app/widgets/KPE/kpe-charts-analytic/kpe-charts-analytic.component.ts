import { ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '@dashboard/services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
    IKpeChartsAnalyticCardValues, IKpeChartsAnalyticDatesInterval,
    IKpeChartsAnalyticGraphData,
    IKpeChartsAnalyticGraphs,
    IKpeChartsAnalyticSharedStates
} from "@dashboard/models/KPE/kpe-charts-analytic.model";
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { KpeChartsAnalyticService } from '@dashboard/services/widgets/KPE/kpe-charts-analytic.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';
import { HttpClient } from '@angular/common/http';
import {IChartAnalytic, IManufacture} from '@widgets/KPE/kpe-charts-analytic/models/chart-analytic';
import {KpeChartsAnalyticViewComponent} from '@widgets/KPE/kpe-charts-analytic/components/kpe-charts-analytic-view/kpe-charts-analytic-view.component';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { KpeChartsAnalyticDataService } from '@widgets/KPE/kpe-charts-analytic/kpe-charts-analytic.service';

type ChartType = 'limited-line-chart' | 'line-chart' | 'bar-chart-1' | 'bar-chart-2';

type TimePeriod = 'hour' | 'day' | 'month' | 'year';

type Units = 'tons' | 'тыс.тн/сут2' | 'percents';

@Component({
    selector: 'evj-kpe-charts-analytic',
    templateUrl: './kpe-charts-analytic.component.html',
    styleUrls: ['./kpe-charts-analytic.component.scss'],
    /*animations: [
        trigger('tabAnimation', [
            state('*', style({ 'overflow-y': 'hidden' })),
            state('void', style({ 'overflow-y': 'hidden' })),
            transition('* => void', [
                style({ height: '*' }),
                animate('300ms', style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate('300ms', style({ height: '*' }))
            ])
        ])
    ],*/
})
export class KpeChartsAnalyticComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public entryStates: FormGroup = new FormGroup({
        manufacture: new FormControl(),
        unit: new FormControl(),
        group: new FormControl(),
        indicator: new FormControl(),

        element: new FormControl(), // TODO: refactor name
        viewType: new FormControl(),
        chartType: new FormControl(),
        engUnit: new FormControl(),
        dateInterval: new FormControl(),
        isSync: new FormControl(),
    });

    public readonly viewComponent: typeof KpeChartsAnalyticViewComponent = KpeChartsAnalyticViewComponent;

    public sharedStates: FormGroup = new FormGroup({  // форма общего временного интервала
        dateStart: new FormControl(),
        dateEnd: new FormControl(),
    });

    public sbLeft: number = 0;

    public sbWidth: number = 100;

    public scrollData: IChartMini[] = [];

    public selectedPeriod: IDatesInterval;

    public isDateRangePickerEnabled: boolean = true;

    public chartsData: IKpeChartsAnalyticGraphData[];

    public cardValues: IKpeChartsAnalyticCardValues = {
        factValue: 0,
        planValue: 0,
        deviation: 0
    }

    public chartTypeOptions: { type: ChartType; name: string }[] = [
        {
            type: 'limited-line-chart',
            name: 'Коридорный график',
        },
        {
            type: 'line-chart',
            name: 'Линейный график',
        },
        {
            type: 'bar-chart-1',
            name: 'Столбчатый график 1',
        },
        {
            type: 'bar-chart-2',
            name: 'Столбчатый график 2',
        },
    ];

    public timePeriodOptions: { type: TimePeriod; name: string }[] = [
        {
            type: 'hour',
            name: 'Час',
        },
        {
            type: 'day',
            name: 'День',
        },
        {
            type: 'month',
            name: 'Месяц',
        },
        {
            type: 'year',
            name: 'Год',
        },
    ];

    public unitsOptions: { type: Units; name: string }[] = [
        {
            type: 'tons',
            name: 'Тонны',
        },
        {
            type: 'тыс.тн/сут2',
            name: 'тыс.тн/сут2'
        }
    ]
    public channelId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public currentManufacture: string;

    public selectedChartType$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public chartIntervalDates$: Observable<{ dateStart: Date, dateEnd: Date }> = this.sharedStates.valueChanges.pipe(
        filter(dates => !!dates.dateEnd && dates.dateEnd > dates.dateStart),
        tap(() => {
            if (this.chartsData)
            this.getValuesForCards()
        })
    );

    public chartUnits$: Observable<string> = this.entryStates.get('engUnit').valueChanges;

    private sharedStates$: Observable<IKpeChartsAnalyticSharedStates> = this.sharedStates.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(100)
    );
    public manufactures$: BehaviorSubject<IManufacture[]> = new BehaviorSubject([]);

    constructor(
        private chartsAnalyticService: KpeChartsAnalyticService,
        protected widgetService: WidgetService,
        private injector: Injector,
        private http: HttpClient,
        private kpeChartsAnalyticService: KpeChartsAnalyticDataService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private cdref: ChangeDetectorRef,
    ) {
        super(widgetService, id, uniqId);
    }

    public getInjector = (widgetId: string, viewType: string = null, interval: IKpeChartsAnalyticDatesInterval, units: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: '' },
                { provide: 'viewType', useValue: viewType },
                { provide: 'interval', useValue: interval },
                { provide: 'units', useValue: units }
            ],
            parent: this.injector,
        });
    };

    ngOnInit(): void {

        super.widgetInit();
        this.subscriptions.push(
            combineLatest([this.sharedStates$, this.entryStates.get('isSync').valueChanges]).subscribe((x) => {
                if (x[1]) {
                    this.chartsAnalyticService.setSync(this.uniqId, {
                                fromDateTime: x[0].dateStart,
                                toDateTime: x[0].dateEnd,
                            });
                }
            }),
            this.chartsAnalyticService.isSyncEnabled$.subscribe((x) => {
                if (this.uniqId !== x.uniqueId && x.value) {
                    this.entryStates.get('isSync').setValue(false);
                    this.setDates({ fromDateTime: x.dateStart, toDateTime: x.dateEnd });
                } else if (this.uniqId === x.uniqueId && !x.value) {
                    this.chartsAnalyticService.cancelSync()
                    this.setDates();
                }
            }),
            this.entryStates.get('chartType').valueChanges.subscribe((value) => {
                this.selectedChartType$.next(value);
            }),
            this.entryStates.get('manufacture').valueChanges.subscribe(value => {
                this.currentManufacture = value;
            }),
            this.widgetService.currentDates$.subscribe((ref) => {
                if (!!this.chartsAnalyticService.getSync()?.value) {
                    return;
                }
                this.selectedPeriod = ref;
                if (!this.selectedPeriod) {
                    const today = new Date();
                    this.selectedPeriod = {
                        fromDateTime: new Date(today.setHours(0, 0, 0, 0)),
                        toDateTime: new Date(today.setHours(23, 59, 59, 999)),
                    };
                } else {
                    this.selectedPeriod.fromDateTime = new Date(this.selectedPeriod.fromDateTime);
                    this.selectedPeriod.toDateTime = new Date(this.selectedPeriod.toDateTime);
                }
                this.setDates();
            })
        );
    }

    private getValuesForCards(): void {
        const searchDate = this.sharedStates.value.dateEnd.toISOString();

        this.cardValues = {
            factValue: this.filterChartData('fact', searchDate),
            planValue: this.filterChartData('plan', searchDate),
            deviation: this.cardValues.planValue - this.cardValues.factValue
        }
    }

    private filterChartData(graphType: string, date: string): number {
        const graph = this.chartsData.find(item => item.graphType === graphType );
        const graphArray = graph.graph;

        const filteredArray = graphArray.filter(point =>
            (new Date(point.timeStamp).getFullYear() === new Date(date).getFullYear())
         && (new Date(point.timeStamp).getMonth() === new Date(date).getMonth())
         && (new Date(point.timeStamp).getDate() === new Date(date).getDate()));

        const valueForTheLastDate = filteredArray[filteredArray.length - 1]?.value;

        const roundedValue = Math.floor(valueForTheLastDate);

        return roundedValue ? roundedValue : 0
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public setChartType(chartType: string): void {
        this.selectedChartType$.next(chartType);
    }

    public syncChange(value: boolean): void {
        this.chartsAnalyticService.cancelSync();
        this.entryStates.get('isSync').setValue(value);
    }

    private setDates(dates?: IDatesInterval): void {
        this.sharedStates.get('dateStart').setValue(dates ? dates.fromDateTime : this.selectedPeriod.fromDateTime);
        this.sharedStates.get('dateEnd').setValue(dates ? dates.toDateTime : this.selectedPeriod.toDateTime);
        this.cdref.detectChanges();
    }

    protected dataHandler(ref: IChartAnalytic): void {
        if (Object.keys(ref).includes('manufactures')) {
            this.manufactures$.next(ref.manufactures);
        }
    }

    private createSubChannel(subchannelId: string): Observable<IKpeChartsAnalyticGraphs> {
        const virtualChannel = new VirtualChannel<IKpeChartsAnalyticGraphs>(this.widgetService, {
            channelId: this.widgetId,
            subchannelId,
        });

        return virtualChannel.data$;
    }

    public subscribeToIndicator(subchannelId: string): void {
        this.channelId$.next(subchannelId);
        this.subscriptions.push(this.createSubChannel(subchannelId).subscribe(result => {
            this.setDefaultUnits(result);
            this.chartsData = result.data;
            this.getValuesForCards();
            this.kpeChartsAnalyticService.setChartData(result.data);
            this.cdref.detectChanges();
        }))
    }

    private setDefaultUnits(suscriptionResult: IKpeChartsAnalyticGraphs): void {
        const selectedOption = this.unitsOptions.find(item => item.name === suscriptionResult.units);
        this.entryStates.get('engUnit').setValue(selectedOption.type);
    }
}
