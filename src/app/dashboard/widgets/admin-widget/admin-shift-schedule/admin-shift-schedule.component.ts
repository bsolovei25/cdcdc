import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NewWidgetService } from '../../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {
    MatCalendar,
    MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IWorker } from '../../../models/worker';

@Component({
    selector: 'evj-admin-shift-schedule',
    templateUrl: './admin-shift-schedule.component.html',
    styleUrls: ['./admin-shift-schedule.component.scss'],
})
export class AdminShiftScheduleComponent implements OnDestroy {
    aboutWidget: string;
    public previewTitle: string = 'calendar-plan';
    public title: string = '';
    defaultLocale: string = 'ru-RU';

    public subscription: Subscription;

    @ViewChild('calendar', { static: true }) calendar: MatCalendar<Date>;

    size = [1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 6, 7, 7];

    selectedDate: Date;

    public man: IWorker = {
        name: 'Иванов Иван Сергеевич',
        phone: '+ 7 (925) 599-99-87',
        email: 'Ivanov@gazprom-neft.ru',
        brigade: 'Бригада №1',
        accessLevel: 'Высокий уровень доступа',
        position: 'Старший оператор | КИПиА',
    };

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private dateAdapter: DateAdapter<any>
    ) {
        this.subscription = this.widgetService
            .getWidgetChannel(this.id)
            .subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
            });
        this.setRus();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateClass() {
        return (date: Date): MatCalendarCellCssClasses => {
            if (date.getDate() === 1) {
                this.selectedDate = date;
                return 'special-date';
            } else {
                return;
            }
        };
    }

    setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }
}
