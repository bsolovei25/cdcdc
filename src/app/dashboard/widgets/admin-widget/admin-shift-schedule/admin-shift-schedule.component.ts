import {
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    EventEmitter,
    Output,
    ElementRef,
    Renderer2,
} from '@angular/core';
import { NewWidgetService } from '../../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IWorker } from '../../../models/worker';
import { IUser } from '../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';

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

    activeUsers = new SelectionModel(true);

    active: boolean = true;

    size: number[] = [1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 6, 7, 7];
    now: moment.Moment = moment();
    selectedDate: Date = this.now.toDate();
    yesterday: IDay = {
        date: new Date(this.now.subtract(1, 'days').toDate()),
        isUnassigned: true,
        shift: [
            {
                id: 1,
                title: '1',
                timeStart: new Date('2020-02-11T00:00:00'),
                timeEnd: new Date('2020-02-12T03:03:00'),
            },
        ],
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
            date: new Date('2020-02-13T00:00:00'),
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

    dataBrigade: IBrigade[] = [
        {
            id: 1,
            number: '1',
            user: [
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
            ],
        },
        {
            id: 1,
            number: '2',
            user: [
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
            ],
        },
        {
            id: 1,
            number: '3',
            user: [
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
            ],
        },
        {
            id: 1,
            number: '4',
            user: [
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
            ],
        },
        {
            id: 1,
            number: '5',
            user: [
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
                {
                    firstName: 'Иван',
                    middleName: 'Сергеевич',
                    lastName: 'Иванов',
                    phone: '+ 7 (925) 599-99-87',
                    email: 'Ivanov@gazprom-neft.ru',
                    positionDescription: 'Старший оператор | КИПиА',
                    id: 1,
                    login: 'fd',
                },
            ],
        },
    ];

    @ViewChild('shiftOverlay', { static: false }) shiftOverlay: ElementRef;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
        this.setRus();
        this.activeUsers.select();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateChanged(event: moment.Moment) {
        this.yesterday = {
            date: new Date(
                moment(this.selectedDate)
                    .subtract(1, 'days')
                    .toDate()
            ),
            isUnassigned: true,
            shift: [],
        };

        const day = this.dataMonth.find((val) => moment(val.date).date() === moment(event).date());

        this.selectedDay = day;
    }

    onClickCard(i: IUser) {
        if (this.activeUsers.isSelected(i)) {
            this.activeUsers.deselect(i);
        } else {
            this.activeUsers.select(i);
        }
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

    openOverlay(event: MouseEvent, shift: any, isOpen: boolean) {
        if (this.shiftOverlay && this.shiftOverlay.nativeElement) {
            if (isOpen) {
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'block');
            } else {
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'none');
            }
        }
    }

    setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }
}
