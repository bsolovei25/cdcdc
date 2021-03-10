import { ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '../../../dashboard/services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
    IKpeChartsAnalyticSharedStates,
} from '../../../dashboard/models/KPE/kpe-charts-analytic.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { KpeChartsAnalyticService } from '../../../dashboard/services/widgets/KPE/kpe-charts-analytic.service';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { KpeEqualizerChartComponent } from "../shared/kpe-equalizer-chart/kpe-equalizer-chart.component";
import { KpeChartsAnalyticMainChartComponent } from "./components/kpe-charts-analytic-main-chart/kpe-charts-analytic-main-chart.component";
import { IChartMini } from "@shared/models/smart-scroll.model";
import { HttpClient } from "@angular/common/http";

type ChartType = 'limited-line-chart' | 'line-chart' | 'bar-chart-1' | 'bar-chart-2';

type TimePeriod = 'hour' | 'day' | 'month' | 'year';

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
        element: new FormControl(), // TODO: refactor name
        viewType: new FormControl(),
        chartType: new FormControl(),
        engUnit: new FormControl(),
        dateInterval: new FormControl(),
        isSync: new FormControl(),
    });

    public readonly kpeEqualizerChartComponent: typeof KpeEqualizerChartComponent = KpeEqualizerChartComponent;
    public readonly kpeChartsAnalyticMainChartComponent: typeof KpeChartsAnalyticMainChartComponent = KpeChartsAnalyticMainChartComponent;

    public sharedStates: FormGroup = new FormGroup({
        dateStart: new FormControl(),
        dateEnd: new FormControl(),
    });

    public sbLeft: number = 0;

    public sbWidth: number = 100;

    public scrollData: IChartMini[] = [];

    public selectedPeriod: IDatesInterval;

    public barChart2Data: any;

    public isDateRangePickerEnabled: boolean = true;

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
    ]

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
    ]

    public selectedChartType$: BehaviorSubject<ChartType> = new BehaviorSubject<ChartType>('limited-line-chart');
    private sharedStates$: Observable<IKpeChartsAnalyticSharedStates> = this.sharedStates.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(100)
    );

    constructor(
        private chartsAnalyticService: KpeChartsAnalyticService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private cdref: ChangeDetectorRef,
        private http: HttpClient,
    ) {
        super(widgetService, isMock, id, uniqId);
        this.entryStates.get('chartType').setValue('limited-line-chart');
        this.entryStates.get('dateInterval').setValue('hour');
    }

    ngOnInit(): void {
        this.mockDataConnect();

        super.widgetInit();
        this.subscriptions.push(
            /*combineLatest([this.entryStates$, this.sharedStates$])
                .pipe(map((x) => ({ ...x[0], ...x[1] })))
                .subscribe((x) => console.log('form', x)),*/
            combineLatest([this.sharedStates$, this.entryStates.get('isSync').valueChanges]).subscribe((x) => {
                if (!x[1]) {
                    if (!this.chartsAnalyticService.getSync().value) {
                        this.isDateRangePickerEnabled = true;
                    }
                    return;
                } else {
                    this.chartsAnalyticService.setSync(this.uniqId, {
                        fromDateTime: x[0].dateStart,
                        toDateTime: x[0].dateEnd
                    });
                }
            }),
            this.chartsAnalyticService.isSyncEnabled$.subscribe((x) => {
                if (this.uniqId !== x.uniqueId && x.value) {
                    this.isDateRangePickerEnabled = false;
                    this.entryStates.get('isSync').setValue(false);
                    this.setDates({ fromDateTime: x.dateStart, toDateTime: x.dateEnd });
                } else if (this.uniqId === x.uniqueId && !x.value) {
                    this.isDateRangePickerEnabled = true;
                    this.chartsAnalyticService.cancelSync();
                    this.setDates();
                } else {
                    this.isDateRangePickerEnabled = true;
                }
            }),
            this.entryStates.get('chartType').valueChanges.subscribe(value => {
                this.selectedChartType$.next(value);
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
            }),
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public async mockDataConnect(): Promise<void> {
        this.barChart2Data = await this.http.get<any>('assets/mock/KPE/equalizer-chart.json').toPromise();
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

    protected dataHandler(ref: unknown): void {}
}
