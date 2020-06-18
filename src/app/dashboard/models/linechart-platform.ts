import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { filter, map, mergeAll } from 'rxjs/operators';
import { IDatesInterval, WidgetService } from '../services/widget.service';
import { OnDestroy, OnInit } from '@angular/core';
import { IProductionTrend } from './production-trends.model';

export type SmartGraphType = 'realtime' | 'rest';


export abstract class LineChartPlatform<T extends IProductionTrend> implements OnInit, OnDestroy {

    /// CONFIG
    // Отступ скролла в процентах от правой части для трансляции данных
    private readonly realtimeDelta: number = 10;

    protected dateTimeInterval: IDatesInterval = null;

    public sbLeft: number = 70;
    public sbWidth: number = 30;

    protected dataType: SmartGraphType;

    public subGraphData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
    public graphData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);

    protected set subGraphData(value: T[]) {
        this.subGraphData$.next(value);
    }

    protected set graphData(value: T[]) {
        this.graphData$.next(value);
    }

    private subscriptions: Subscription[] = [];

    protected constructor(protected widgetService: WidgetService) {
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe(this.changesIntervalHandler.bind(this))
        );
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    // Обработчик изменения времени хэдера
    protected async changesIntervalHandler(ref: IDatesInterval): Promise<void> {
        this.dateTimeInterval = ref;
        if (ref) {
            this.dataType = 'rest';
        } else {
            this.dataType = 'realtime';
        }
    }

    // Получение данных из сокетов
    protected wsDataHandler(data: T[]): void {
        if (!data) {
            return;
        }
        data.map((item) => item?.graph.map(value => value.timeStamp = new Date(value.timeStamp)));
        this.subGraphData = data;
        if (this.dataType === 'rest') {
            this.restDataHandler(data);
        } else if (this.dataType === 'realtime') {
            this.realtimeDataHandler(data);
        }
    }

    // Обработчик событий scroll
    public scrollHandler(): void {
        this.setRestGraphData();
    }

    // Обработчик данных при режиме работы REST
    protected restDataHandler(data: T[]): void {
        this.graphData = data;
        this.sbLeft = 0;
        this.sbWidth = 100;
        // this.setRestGraphData(); // уточник модель данных с сокетов
    }

    // Обработчик данных при режиме работы REALTIME
    protected realtimeDataHandler(data: T[]): void {
        const subGraphInterval = this.getGraphBordersDateTime(data);
        this.dateTimeInterval = { ...subGraphInterval };
        if (this.isRealtimeDeviation()) {
            this.setRestGraphData();
            return;
        }
        const currentGraphInterval = this.getGraphBordersDateTime(this.graphData$.getValue());
        if (currentGraphInterval.fromDateTime.getTime() < subGraphInterval.fromDateTime.getTime()) {
            this.sbLeft = 0;
            this.setRestGraphData();
            return;
        } else if (
            currentGraphInterval.toDateTime.getTime() > subGraphInterval.toDateTime.getTime()
        ) {
            this.sbLeft = 100 - this.sbWidth;
            this.setRestGraphData();
            return;
        }
        const scrollParam = this.extractScrollParams(subGraphInterval, currentGraphInterval);
        this.sbWidth = scrollParam.sbWidth;
        this.sbLeft = scrollParam.sbLeft;
    }

    // запрос на получение данных по ресту
    protected abstract async restGraphHandler(ref: IDatesInterval): Promise<T[]>;

    // Поиск границ временных графика
    protected getGraphBordersDateTime(data: T[]): IDatesInterval {
        const dateTimeArray = data.map(el => el.graph).flat().map((el) => el.timeStamp.getTime());
        const max = dateTimeArray.reduce((prev, cur) => prev > cur ? prev : cur);
        const min = dateTimeArray.reduce((prev, cur) => prev < cur ? prev : cur);
        return {
            fromDateTime: new Date(min),
            toDateTime: new Date(max)
        };
    }

    // Установка значений основного графика
    protected async setRestGraphData(): Promise<void> {
        const reqDateTimeInterval =
            this.extractScrollDateTimes(this.dateTimeInterval, this.sbWidth, this.sbLeft);
        this.graphData = await this.restGraphHandler(reqDateTimeInterval);
    }

    // Проверка расстояния от конца скролла
    protected isRealtimeDeviation(): boolean {
        return 100 - this.sbLeft - this.sbWidth <= this.realtimeDelta;
    }

    protected extractScrollDateTimes(
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
            to: dateTimeInterval.toDateTime.getTime()
        };

        function getByPercent(value: number): number {
            return (timeInterval.to - timeInterval.from) * value / 100;
        }

        return {
            fromDateTime: new Date(timeInterval.from + getByPercent(left)),
            toDateTime: new Date(timeInterval.from + getByPercent(width + left))
        };
    }

    protected extractScrollParams(
        dateTimeInterval: IDatesInterval,
        currentDateTimeInterval: IDatesInterval
    ): { sbWidth: number, sbLeft: number } {
        const sbWidth = getDelta(dateTimeInterval) / getDelta(currentDateTimeInterval) * 100;
        const sbLeft =
            (currentDateTimeInterval.fromDateTime.getTime() - dateTimeInterval.fromDateTime.getTime()) / getDelta(dateTimeInterval);

        function getDelta(interval: IDatesInterval): number {
            return interval.toDateTime.getTime() - interval.fromDateTime.getTime();
        }

        return {
            sbWidth,
            sbLeft
        };
    }
}

/// V2
// export interface ISmartGraph<T[]> {
//     data: T;
//     dataType: SmartGraphType;
// }
//
// export abstract class LineChartPlatform<T[]> implements OnInit, OnDestroy {
//     protected dataType$: BehaviorSubject<SmartGraphType> =
//         new BehaviorSubject<SmartGraphType>('realtime');
//
//     protected set dataType(value: SmartGraphType) {
//         this.dataType$.next(value);
//     }
//
//     private realtimeGraph$: BehaviorSubject<ISmartGraph<T[]>> = new BehaviorSubject<ISmartGraph<T[]>>(null);
//     private restGraph$: BehaviorSubject<ISmartGraph<T[]>> = new BehaviorSubject<ISmartGraph<T[]>>(null);
//     public graphDataObserver: Observable<T[]> =
//         this.dataObserver(this.dataType$, this.realtimeGraph$, this.restGraph$);
//
//     private realtimeSubGraph$: BehaviorSubject<ISmartGraph<T[]>> = new BehaviorSubject<ISmartGraph<T[]>>(null);
//     private restSubGraph$: BehaviorSubject<ISmartGraph<T[]>> = new BehaviorSubject<ISmartGraph<T[]>>(null);
//     public subGraphDataObserver: Observable<T[]> =
//         this.dataObserver(this.dataType$, this.realtimeSubGraph$, this.restSubGraph$);
//
//     private dataObserver(
//         type: BehaviorSubject<'realtime' | 'rest'>,
//         realtime: BehaviorSubject<ISmartGraph<T[]>>,
//         rest: BehaviorSubject<ISmartGraph<T[]>>
//     ): Observable<T[]> {
//         return from([type, realtime, rest]).pipe(
//             mergeAll(),
//             map(value => (value === 'realtime') ? realtime.getValue() : value),
//             map(value => {
//                 if (typeof value !== 'string') {
//                     return value;
//                 }
//                 return null;
//             }),
//             filter((value) => value !== null && value.dataType === this.dataType$.getValue()),
//             map(value => value.data),
//             filter(value => value !== null),
//         );
//     }
//
//     private subscriptions: Subscription[] = [];
//
//     protected dateTimeInterval: IDatesInterval = null;
//
//     protected set restGraph(value: T) {
//         this.restGraph$.next({data: value, dataType: 'rest'});
//     }
//
//     protected set realtimeGraph(value: T) {
//         this.realtimeGraph$.next({data: value, dataType: 'realtime'});
//     }
//
//     protected set restSubGraph(value: T) {
//         this.restSubGraph$.next({data: value, dataType: 'rest'});
//     }
//
//     protected set realtimeSubGraph(value: T) {
//         this.realtimeSubGraph$.next({data: value, dataType: 'realtime'});
//     }
//
//     protected constructor(protected widgetService: WidgetService) {
//     }
//
//     public ngOnInit(): void {
//         this.subscriptions.push(
//             this.widgetService.currentDates$.subscribe(this.changesIntervalHandler.bind(this))
//         );
//     }
//
//     public ngOnDestroy(): void {
//         this.subscriptions.forEach((s) => s.unsubscribe());
//     }
//
//     protected async changesIntervalHandler(ref: IDatesInterval): Promise<void> {
//         if (ref?.toDateTime && ref?.fromDateTime) {
//             this.dataType = 'rest';
//             const data = await this.restGraphHandler(ref);
//             this.restSubGraph = data;
//             this.restGraph = data;
//             return;
//         }
//         this.dataType = 'realtime';
//     }
//
//     protected abstract async restGraphHandler(ref: IDatesInterval): Promise<T[]>;
//
//     public async scrollHandler(sbWidth: number, sbLeft: number): Promise<void> {
//         if (!this.dateTimeInterval) {
//             return;
//         }
//         if (this.dataType$.getValue() === 'realtime') {
//             const subGraphValue = await this.restGraphHandler(this.dateTimeInterval);
//         }
//         this.dataType = 'rest';
//     }
//
//     protected extractScrollDateTimes(
//         dateTimeInterval: IDatesInterval,
//         sbWidth: number,
//         sbLeft: number
//     ): IDatesInterval {
//         if (!(dateTimeInterval && sbWidth && sbLeft)) {
//             console.error('extractScrollDateTimes: No valid params');
//             return null;
//         }
//         const timeInterval = {
//             from: dateTimeInterval.fromDateTime.getTime(),
//             to: dateTimeInterval.toDateTime.getTime()
//         };
//
//         function getByPercent(value: number): number {
//             return (timeInterval.from - timeInterval.to) * value / 100;
//         }
//
//         return {
//             fromDateTime: new Date(getByPercent(sbLeft)),
//             toDateTime: new Date(getByPercent(sbWidth + sbLeft))
//         };
//     }
// }
