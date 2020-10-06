import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { ICalendarPlanGraph, ICalendarPlanData } from 'src/app/dashboard/models/calendar-plan';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

@Component({
    selector: 'evj-calendar-plan',
    templateUrl: './calendar-plan.component.html',
    styleUrls: ['./calendar-plan.component.scss'],
})
export class CalendarPlanComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: ICalendarPlanGraph = {
        plan: 1000,
        lowerBorder: 0.03,
        higherBorder: 0.1,
        curValue: 692,
        maxValue: 1500,
        lowerValue: 1000 * (1 - 0.03),
        higherValue: 1000 * (1 + 0.1),
    };
    public array: ICalendarPlanData[] = [
        {
            name: 'Бензины', // название
            deviation: -0.4, // отклонение
            isBetter: false, // флаг улучшение
        },
        {
            name: 'Керосины', // название
            deviation: +11, // отклонение
            isBetter: true, // флаг улучшение
        },
        {
            name: 'Дизели', // название
            deviation: +6, // отклонение
            isBetter: true, // флаг улучшение
        },
        {
            name: 'Судовое топливо', // название
            deviation: -0.4, // отклонение
            isBetter: true, // флаг улучшение
        },
        {
            name: 'Битумы', // название
            deviation: -0.4, // отклонение
            isBetter: true, // флаг улучшение
        },
        {
            name: 'Мазуты', // название
            deviation: -0.4, // отклонение
            isBetter: true, // флаг улучшение
        },
    ];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        this.data.curValue = ref.currentValue;
        this.data.lowerBorder = Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
        this.data.higherBorder = (this.data.higherBorder - this.data.plan) / this.data.plan;
        this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
        this.array = ref.items;
    }
}
