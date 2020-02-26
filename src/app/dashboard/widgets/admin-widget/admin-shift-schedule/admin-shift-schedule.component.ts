import {
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
} from '@angular/core';
import { NewWidgetService } from '../../../services/new-widget.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IWorker } from '../../../models/worker';
import { IUser } from '../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminShiftScheduleService } from '../../../services/admin-shift-schedule.service';
import { IBrigadeWithUsersDto, IScheduleShiftDay } from '../../../models/admin-shift-schedule';
import { fillDataShape } from '../../../../@shared/common-functions';

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
export class AdminShiftScheduleComponent implements OnInit, OnDestroy {
    aboutWidget: string;
    previewTitle: string = 'calendar-plan';
    title: string = '';
    defaultLocale: string = 'ru-RU';

    public subscription: Subscription;
    static itemCols: number = 30;
    static itemRows: number = 20;

    activeUsers: SelectionModel<IUser> = new SelectionModel(true);

    active: boolean = true;

    size: number[] = [1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 6, 7, 7];
    now: moment.Moment = moment();
    yesterday: IScheduleShiftDay;

    selectedDay: IScheduleShiftDay = {
        date: new Date(),
        isAllShiftsSet: false,
        items: [],
    };
    selectedBrigade: IBrigadeWithUsersDto;

    scheduleShiftMonth: IScheduleShiftDay[] = [];
    allBrigade: IBrigadeWithUsersDto[] = [];

    @ViewChild('shiftOverlay', { static: false }) shiftOverlay: ElementRef;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2,
        private adminShiftScheduleService: AdminShiftScheduleService
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.previewTitle = data.widgetType;
        });
        this.setRus();
        this.activeUsers.select();
    }

    ngOnInit(): void {
        this.loadItem();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dateChanged(event: Date): void {
        const idx = this.scheduleShiftMonth.findIndex(
            (val) => new Date(val.date).getDate() === new Date(event).getDate()
        );
        if (idx !== -1) {
            const day = fillDataShape(this.scheduleShiftMonth[idx]);
            this.selectedDay = day;
            const yesterdayLocal = new Date(
                moment(this.selectedDay.date)
                    .subtract(1, 'days')
                    .toDate()
            );
            const idx2 = this.scheduleShiftMonth.findIndex(
                (val) => new Date(val.date).getDate() === new Date(yesterdayLocal).getDate()
            );
            if (idx2) {
                const yesterdayLocals = fillDataShape(this.scheduleShiftMonth[idx2]);
                this.yesterday = yesterdayLocals;
            }
        }
    }

    onClickCard(i: IUser): void {
        if (this.activeUsers.isSelected(i)) {
            this.activeUsers.deselect(i);
        } else {
            this.activeUsers.select(i);
        }
    }

    onChooseBrigade(brigade: IBrigadeWithUsersDto): void {
        this.selectedBrigade = brigade;
    }

    dateClass(): (d: Date) => string {
        return (date: Date) => {
            let str: string = '';
            this.scheduleShiftMonth.forEach((value) => {
                if (date.getDate() === new Date(value.date).getDate()) {
                    if (!value.isAllShiftsSet) {
                        str = 'special-date';
                    }
                }
            });
            return str;
        };
    }

    // #region DATA API

    async loadItem(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];

        dataLoadQueue.push(
            this.adminShiftScheduleService.getSchudeleShiftsMonth().then((data) => {
                this.scheduleShiftMonth = data;
            })
        );
        dataLoadQueue.push(
            this.adminShiftScheduleService.getBrigade().then((data) => {
                this.allBrigade = data;
            })
        );

        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
            } catch (err) {
                console.error(err);
            }
        }
    }

    // #endregion

    openOverlay(event: MouseEvent, shift: any, isOpen: boolean): void {
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
