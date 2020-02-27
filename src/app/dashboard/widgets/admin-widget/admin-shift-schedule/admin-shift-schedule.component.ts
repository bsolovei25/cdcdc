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
import {
    IBrigadeWithUsersDto,
    IScheduleShiftDay,
    IScheduleShift,
} from '../../../models/admin-shift-schedule';
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

    dateChanged(event: Date): void {
        this.resetComponent();

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
            }
        }
    }

    onClickCard(user: IUser): void {
        if (this.activeUsers.isSelected(user)) {
            this.activeUsers.deselect(user);
        } else {
            this.activeUsers.select(user);
            console.log(user);

            this.adminShiftScheduleService.postMemberFromBrigade(this.selectedShift.id, user.id);
        }
    }

    onChooseBrigade(brigade: IBrigadeWithUsersDto, selectedDay: IScheduleShiftDay): void {
        this.selectedBrigade = brigade;

        this.adminShiftScheduleService.postSelectBrigade(this.selectedShift.id, brigade.brigadeId);
        this.selectShift(this.selectedShift);
        selectedDay.items.find((value) => {
            if (value.id === this.selectedShift.id) {
                value.brigadeId = brigade.brigadeId;
                value.brigadeNumber = brigade.brigadeNumber;
                this.openOverlay(null, null, false);
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
                    this.selectedShift.brigadeId = null;
                    this.selectedShift.brigadeNumber = null;
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
