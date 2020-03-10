import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { ICalendarPlanGraph, ICalendarPlanData } from '../../models/calendar-plan';
import {WidgetPlatform} from '../../models/widget-platform';

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

        /* Вычислить при получении данных */
        // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        // higherValue = this.data.plan * (1 + this.data.higherBorder);

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

    // static itemCols: number = 18;
    // static itemRows: number = 10;
    //
    // public subscriptions: Subscription[] = [];
    //
    // public aboutWidget: string;
    // public previewTitle: string = 'calendar-plan';
    //
    // constructor(
    //     private widgetService: NewWidgetService,
    //     @Inject('isMock') public isMock: boolean,
    //     @Inject('widgetId') public id: string,
    //     @Inject('uniqId') public uniqId: string
    // ) {
    //     this.subscriptions.push(
    //         this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
    //             this.aboutWidget = data.title;
    //         })
    //     );
    // }
    //
    // ngOnInit(): void {
    //     if (!this.isMock) {
    //         this.wsConnect();
    //     }
    // }
    //
    // ngOnDestroy(): void {
    //     for (const subscription of this.subscriptions) {
    //         subscription.unsubscribe();
    //     }
    // }
    //
    // wsConnect(): void {
    //     this.subscriptions.push(
    //         this.widgetService
    //             .getWidgetLiveDataFromWS(this.id, 'calendar-plan')
    //             .subscribe((ref) => {
    //                 this.data = ref;
    //                 this.data.curValue = ref.currentValue;
    //                 this.data.lowerBorder =
    //                     Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
    //                 this.data.higherBorder =
    //                     (this.data.higherBorder - this.data.plan) / this.data.plan;
    //                 this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
    //                 this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
    //                 this.array = ref.items;
    //             })
    //     );
    // }

    constructor(
        protected widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);

        this.itemCols = 18;
        this.itemRows = 10;
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        this.data.curValue = ref.currentValue;
        this.data.lowerBorder =
            Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
        this.data.higherBorder =
            (this.data.higherBorder - this.data.plan) / this.data.plan;
        this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
        this.array = ref.items;
    }
}
