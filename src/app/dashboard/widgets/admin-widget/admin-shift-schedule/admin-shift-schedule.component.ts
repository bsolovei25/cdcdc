import { Component, Inject, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { NewWidgetService } from '../../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IWorker } from '../../../models/worker';
import { IUser } from '../../../models/events-widget';

export interface IAdminShiftSchedule {
    worker: IWorker[];
}

interface IDay {
    date: Date;
    isUnassigned: boolean;
    shift: {
        id: number;
        title: string;
        timeStart: Date;
        timeEnd: Date;
    }[];
}

interface IBrigade {
    id: number;
    number: string;
    user: IUser[];
}

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
    static itemCols: number = 30;
    static itemRows: number = 20;

    size: number[] = [1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 6, 7, 7];
    now: moment.Moment = moment();
    selectedDate: Date = this.now.toDate();
    yesterday: IDay = {
        date: new Date(this.now.subtract(1, 'days').toDate()),
        isUnassigned: true,
        shift: [],
    };

    selectedDay: IDay;

    dataMonth: IDay[] = [
        {
            date: new Date(),
            isUnassigned: false,
            shift: [
                {
                    id: 1,
                    title: '1',
                    timeStart: new Date('2020-02-11T00:00:00'),
                    timeEnd: new Date('2020-02-12T03:03:00'),
                },
                {
                    id: 2,
                    title: '2',
                    timeStart: new Date('2020-02-11T00:00:00'),
                    timeEnd: new Date('2020-02-12T03:03:00'),
                },
                {
                    id: 3,
                    title: '3',
                    timeStart: new Date('2020-02-11T00:00:00'),
                    timeEnd: new Date('2020-02-12T03:03:00'),
                },
            ],
        },
        {
            date: new Date('02.12.2020 15:38:17'),
            isUnassigned: true,
            shift: [
                {
                    id: 1,
                    title: '1',
                    timeStart: new Date(),
                    timeEnd: new Date(),
                },
                {
                    id: 2,
                    title: '2',
                    timeStart: new Date(),
                    timeEnd: new Date(),
                },
                {
                    id: 3,
                    title: '3',
                    timeStart: new Date(),
                    timeEnd: new Date(),
                },
            ],
        },
    ];

    dataBrigade: IBrigade;

    man = {
        name: 'Иванов Иван Сергеевич',
        phone: '+ 7 (925) 599-99-87',
        email: 'Ivanov@gazprom-neft.ru',
        brigade: 'Бригада №1',
        accessLevel: 'Высокий уровень доступа',
        position: 'Старший оператор | КИПиА',
    };

    @ViewChild('mycalendar', { static: true }) calendar: MatCalendar<Date>;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private dateAdapter: DateAdapter<Date>
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
        this.setRus();
        console.log(this.dataMonth);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateChanged(event: moment.Moment) {
        this.yesterday = {
            date: new Date(this.now.subtract(1, 'days').toDate()),
            isUnassigned: true,
            shift: [],
        };
        console.log(moment(event).date());

        const day = this.dataMonth.find((val) => moment(val.date).date() === moment(event).date());

        this.selectedDay = day;
    }

    dateClass() {
        return (date: Date) => {
            let str: string = '';
            this.dataMonth.forEach((value) => {
                if (date.getDate() === value.date.getDate()) {
                    str = 'special-date';
                } else {
                    return;
                }
            });
            return str;
        };
    }

    setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }
}
