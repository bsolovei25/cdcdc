import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { ICalendarPlanGraph, ICalendarPlanData } from '../../models/calendar-plan';

@Component({
    selector: 'evj-calendar-plan',
    templateUrl: './calendar-plan.component.html',
    styleUrls: ['./calendar-plan.component.scss'],
})
export class CalendarPlanComponent implements OnInit {
    /* Приблизительная структура, получаемая с бека */

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

    static itemCols: number = 18;
    static itemRows: number = 10;

    public subscriptions: Subscription[] = [];

    public aboutWidget: string;
    public previewTitle: string = 'calendar-plan';

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.aboutWidget = data.title;
        }));
    }

    ngOnInit(): void {
        if (!this.isMock) {
           this.wsConnect() ;
        }
    }

    wsConnect(): void {
        this.subscriptions.push(
            this.widgetService.getWidgetLiveDataFromWS(this.id, 'calendar-plan').subscribe((ref) => {
                console.log(ref);
            })
        );
    }
}
