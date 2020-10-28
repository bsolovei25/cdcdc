import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDatesInterval, WidgetService } from '../../services/widget.service';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { IProductionTrend } from '../LCO/production-trends.model';
import { IChartMini } from '@shared/models/smart-scroll.model';

export type SmartGraphType = 'realtime' | 'rest';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class LineChartPlatform<T extends IProductionTrend> implements OnInit, OnDestroy {
    /// CONFIG
    // Отступ скролла в процентах от правой части для трансляции данных
    private readonly realtimeDelta: number = 10;

    public dateTimeInterval: IDatesInterval = null;
    public graphDateTimeInterval: IDatesInterval = null;

    public sbLeft: number = 70;
    public sbWidth: number = 30;

    protected dataType: SmartGraphType;

    public subGraphData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
    public graphData$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);

    public scrollData$: Observable<IChartMini[]> = this.subGraphData$.asObservable().pipe(
        map((graphs) => graphs?.find((g) => g.graphType === 'fact')?.graph ?? null),
        filter((value) => value !== null)
    );

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

    public ngOnInit(): void {}

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
        data.map((item) =>
            item?.graph.map((value) => (value.timeStamp = new Date(value.timeStamp)))
        );
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
        // const currentGraphInterval = this.getGraphBordersDateTime(this.graphData$.getValue());
        const currentGraphInterval = { ...this.graphDateTimeInterval };
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
        const dateTimeArray = data
            .map((el) => el.graph)
            .flat()
            .map((el) => el.timeStamp.getTime());
        const max = dateTimeArray.reduce((prev, cur) => (prev > cur ? prev : cur));
        const min = dateTimeArray.reduce((prev, cur) => (prev < cur ? prev : cur));
        return {
            fromDateTime: new Date(min),
            toDateTime: new Date(max),
        };
    }

    // Установка значений основного графика
    protected async setRestGraphData(): Promise<void> {
        const reqDateTimeInterval = this.extractScrollDateTimes(
            this.dateTimeInterval,
            this.sbWidth,
            this.sbLeft
        );
        this.graphDateTimeInterval = { ...reqDateTimeInterval };
        const data = await this.restGraphHandler(reqDateTimeInterval);
        if (!data) {
            return;
        }
        data.map((item) =>
            item?.graph.map((value) => (value.timeStamp = new Date(value.timeStamp)))
        );
        this.graphData = data;
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

    protected extractScrollParams(
        dateTimeInterval: IDatesInterval,
        currentDateTimeInterval: IDatesInterval
    ): { sbWidth: number; sbLeft: number } {
        const sbWidth = (getDelta(dateTimeInterval) / getDelta(currentDateTimeInterval)) * 100;
        const sbLeft =
            (currentDateTimeInterval.fromDateTime.getTime() -
                dateTimeInterval.fromDateTime.getTime()) /
            getDelta(dateTimeInterval);

        function getDelta(interval: IDatesInterval): number {
            return interval.toDateTime.getTime() - interval.fromDateTime.getTime();
        }

        return {
            sbWidth,
            sbLeft,
        };
    }
}
