import {
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    AfterViewInit,
    AfterContentChecked,
} from '@angular/core';
import { NewWidgetService } from '../../../services/new-widget.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IWorker } from '../../../models/worker';
import { IUser } from '../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminShiftScheduleService } from '../../../services/admin-shift-schedule.service';
import {
    IBrigadeWithUsersDto,
    IScheduleShiftDay,
    IScheduleShift,
} from '../../../models/admin-shift-schedule';
import { fillDataShape } from '../../../../@shared/common-functions';
import { MatCalendar } from '@angular/material/datepicker';

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
export class AdminShiftScheduleComponent implements OnInit, OnDestroy, AfterContentChecked {
    aboutWidget: string;
    previewTitle: string = 'calendar-plan';
    title: string = '';
    defaultLocale: string = 'ru-RU';

    public subscription: Subscription;
    static itemCols: number = 30;
    static itemRows: number = 20;

    activeUsers: SelectionModel<IUser> = new SelectionModel(true);

    dateNow: Date = new Date();

    selectedDay: IScheduleShiftDay = {
        date: new Date(),
        isAllShiftsSet: false,
        items: [],
    };
    yesterday: IScheduleShiftDay;

    selectedShift: IScheduleShift;
    selectedBrigade: IBrigadeWithUsersDto;

    scheduleShiftMonth: IScheduleShiftDay[] = [];
    allBrigade: IBrigadeWithUsersDto[] = [];

    @ViewChild('shiftOverlay', { static: false }) shiftOverlay: ElementRef;
    @ViewChild('calendar') calendar: MatCalendar<Date>;

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
    }

    ngOnInit(): void {
        this.loadItem();
        this.dateChanged(this.selectedDay.date);
    }

    ngAfterContentChecked(): void {
        const buttons = document
            .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
        if (buttons) {
            buttons.forEach(button => {
                this.renderer.listen(button, 'click', () => {
                    if (this.calendar?.activeDate) {
                        if (button.getAttribute('aria-label') === 'Next month') {
                            this.nextMonth();
                        } else {
                            this.nextPrevious();
                        }
                    }
                });
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    resetComponent(): void {
        this.yesterday = null;
        this.selectedShift = null;
        this.selectedBrigade = null;
        this.activeUsers.clear();
    }

    nextMonth(): void {
        if (this.calendar.activeDate !== this.dateNow) {
            this.adminShiftScheduleService
                .getSchudeleShiftsMonth(this.calendar.activeDate.getMonth() + 1,
                    this.calendar.activeDate.getFullYear()).then((data) => {
                        this.scheduleShiftMonth = data;
                    });
            this.dateNow = this.calendar.activeDate;
        }
    }

    nextPrevious(): void {
        if (this.calendar.activeDate !== this.dateNow) {
            this.adminShiftScheduleService
                .getSchudeleShiftsMonth(this.calendar.activeDate.getMonth() + 1,
                    this.calendar.activeDate.getFullYear()).then((data) => {
                        this.scheduleShiftMonth = data;
                    });
            this.dateNow = this.calendar.activeDate;
            // console.log(this.calendar.dateClass);
            // this.dateClass(this.calendar.dateClass);
        }
    }

    dateChanged(event: Date): void {
        this.resetComponent();
        this.loadItem();
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
            const idxYesterday = this.scheduleShiftMonth.findIndex(
                (val) => new Date(val.date).getDate() === new Date(yesterdayLocal).getDate()
            );
            if (idxYesterday) {
                const yesterdayLocals = fillDataShape(this.scheduleShiftMonth[idxYesterday]);
                this.yesterday = yesterdayLocals;
                this.yesterday.items = [this.yesterday.items[this.yesterday.items.length - 1]];
            }
        }
    }

    onClickCard(user: IUser): void {
        if (this.activeUsers.isSelected(user)) {
            this.activeUsers.deselect(user);
        } else {
            this.activeUsers.select(user);
            this.adminShiftScheduleService.postMemberFromBrigade(this.selectedShift.id, user.id);
        }
    }

    onChooseBrigade(brigade: IBrigadeWithUsersDto, selectedDay: IScheduleShiftDay): void {
        this.selectedBrigade = brigade;

        this.adminShiftScheduleService.postSelectBrigade(this.selectedShift.id, brigade.brigadeId);
        this.selectShift(this.selectedShift);
        this.adminShiftScheduleService.getSchudeleShiftsMonth(this.dateNow.getMonth() + 1,
            this.dateNow.getFullYear()).then((data) => {
                this.scheduleShiftMonth = data;
                this.calendar.dateClass = this.dateClass;
            });
        selectedDay.items.find((value) => {
            if (value.id === this.selectedShift.id) {
                value.brigadeId = brigade.brigadeId;
                value.brigadeName = brigade.brigadeNumber;
                this.openOverlay(null, null, false);
                this.calendar.dateClass = this.dateClass;

            }
        });
    }

    openOverlay(event: MouseEvent, shift: IScheduleShift, isOpen: boolean): void {
        if (this.shiftOverlay?.nativeElement) {
            if (isOpen) {
                this.selectedShift = shift;
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'block');
            } else {
                if (event && !shift) {
                    this.adminShiftScheduleService.deleteBrigade(this.selectedShift.id);
                    const sh = this.selectedDay
                        .items.find((val) => val.id === this.selectedShift.id);
                    sh.brigadeName = null;
                    this.selectedShift.brigadeId = null;
                    this.selectedShift.brigadeName = null;
                    this.calendar.dateClass = this.dateClass;
                }
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'none');
            }
        }
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
        const dateNow = new Date();
        dataLoadQueue.push(
            this.adminShiftScheduleService.getSchudeleShiftsMonth(dateNow.getMonth() + 1,
                dateNow.getFullYear()).then((data) => {
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

    selectShift(shift: IScheduleShift): void {
        this.adminShiftScheduleService.getSchudeleShift(shift.id).then((data) => {
            this.selectedShift = data;
        });
    }

    filterBrigade(brigadeUsers: IBrigadeWithUsersDto[]): IBrigadeWithUsersDto[] {
        this.selectedDay.items.forEach((shift) => {
            brigadeUsers = brigadeUsers.filter(
                // TOFIX  игнорит 5 бригаду
                (val) => val.brigadeId !== shift.brigadeId && val.brigadeNumber !== '5'
            );
        });
        return brigadeUsers;
    }

    setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }
}
