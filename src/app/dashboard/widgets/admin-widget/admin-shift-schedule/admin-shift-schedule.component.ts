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
    IShiftMember,
} from '../../../models/admin-shift-schedule';
import { fillDataShape } from '../../../../@shared/common-functions';
import { MatCalendar } from '@angular/material/datepicker';

export interface IAdminShiftSchedule {
    worker: IWorker[];
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
        isAllShiftsSet: true,
        items: [],
    };
    yesterday: IScheduleShiftDay;

    selectedShift: IScheduleShift;
    selectedBrigade: IBrigadeWithUsersDto;
    buttons;

    scheduleShiftMonth: IScheduleShiftDay[] = [];

    allBrigade: IBrigadeWithUsersDto[] = [];
    brigadesSubstitution: IBrigadeWithUsersDto;

    nextAndPreviousMonthVar;

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
        this.buttons = document.querySelectorAll(
            '.mat-calendar-previous-button, .mat-calendar-next-button'
        );
        if (this.buttons && !this.nextAndPreviousMonthVar) {
            this.buttons.forEach((button) => {
                if (
                    button.getAttribute('aria-label') === 'Previous month' ||
                    button.getAttribute('aria-label') === 'Next month'
                ) {
                    this.nextAndPreviousMonthVar = this.renderer.listen(button, 'click', () => {
                        if (this.calendar?.activeDate) {
                            this.nextAndPreviousMonth();
                        }
                    });
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private resetComponent(): void {
        this.yesterday = null;
        this.selectedShift = null;
        this.selectedBrigade = null;
        this.activeUsers.clear();
    }

    private async nextAndPreviousMonth(): Promise<void> {
        if (this.calendar.activeDate !== this.dateNow) {
            this.dateNow = this.calendar.activeDate;
            this.reLoadDataMonth();
        }
    }

    public dateChanged(event: Date): void {
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
            if (idxYesterday !== -1) {
                const yesterdayLocals = fillDataShape(this.scheduleShiftMonth[idxYesterday]);
                this.yesterday = yesterdayLocals;
                this.yesterday.items = [this.yesterday.items[this.yesterday.items.length - 1]];
            }
        }
        if (this.calendar) {
            this.calendar.updateTodaysDate();
        }
    }

    public async onClickCard(user: IUser): Promise<void> {
        if (this.activeUsers.isSelected(user)) {
            await this.adminShiftScheduleService.deleteMemberFromBrigade(
                this.selectedShift.id,
                user.id
            );
            this.activeUsers.deselect(user);
        } else {
            await this.adminShiftScheduleService.postMemberFromBrigade(
                this.selectedShift.id,
                user.id
            );
            this.activeUsers.select(user);
        }
    }

    public async onChooseBrigade(
        brigade: IBrigadeWithUsersDto,
        selectedDay: IScheduleShiftDay
    ): Promise<void> {
        this.openOverlay(null, null, false);
        this.selectedBrigade = brigade;
        this.selectShift(this.selectedShift);
        await this.adminShiftScheduleService.postSelectBrigade(
            this.selectedShift.id,
            brigade.brigadeId
        );
        this.reLoadDataMonth();
        selectedDay.items.find((value) => {
            if (value.id === this.selectedShift.id) {
                value.brigadeId = brigade.brigadeId;
                value.brigadeName = brigade.brigadeNumber;
                if (this.calendar) {
                    this.calendar.updateTodaysDate();
                }
            }
        });
    }

    async deleteBrigadeFromShift(): Promise<void> {
        await this.adminShiftScheduleService.deleteBrigade(this.selectedShift.id);
        const sh = this.selectedDay.items.find((val) => val.id === this.selectedShift.id);
        this.openOverlay(null, null, false);
        if (sh) {
            sh.brigadeName = null;
            sh.brigadeId = null;
            this.reLoadDataMonth();
        }
    }

    public openOverlay(event: MouseEvent, shift: IScheduleShift, isOpen: boolean): void {
        if (this.shiftOverlay?.nativeElement) {
            if (isOpen) {
                this.selectedShift = shift;
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'block');
            } else {
                this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'none');
            }
        }
    }

    public dateClass(): (d: Date) => string {
        return (date: Date) => {
            let str: string = '';
            this.scheduleShiftMonth.forEach((value) => {
                if (
                    date.getMonth() === new Date(value.date).getMonth() &&
                    date.getDate() === new Date(value.date).getDate() &&
                    date.getFullYear() === new Date(value.date).getFullYear()
                ) {
                    if (!value.isAllShiftsSet) {
                        str = 'special-date';
                    }
                }
            });
            return str;
        };
    }

    public filterShiftMembers(shiftMembers: IShiftMember[]): IShiftMember[] {
        this.brigadesSubstitution.users.forEach((user) => {
            shiftMembers = shiftMembers.filter((member) => member.employee.id !== user.id);
        });
        return shiftMembers;
    }

    private async reLoadDataMonth(): Promise<void> {
        await this.adminShiftScheduleService
            .getSchudeleShiftsMonth(this.dateNow.getMonth() + 1, this.dateNow.getFullYear())
            .then((data) => {
                if (data && data.length > 0) {
                    this.scheduleShiftMonth = data;
                    if (this.calendar) {
                        this.calendar.updateTodaysDate();
                    }
                } else {
                    this.resetComponent();
                }
            });
    }

    // #region DATA API

    public async loadItem(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(this.reLoadDataMonth());
        dataLoadQueue.push(
            this.adminShiftScheduleService.getBrigades().then((data) => {
                this.allBrigade = data;
            })
        );
        dataLoadQueue.push(
            this.adminShiftScheduleService.getBrigadesSubstitution().then((data) => {
                this.brigadesSubstitution = data;
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

    public async selectShift(shift: IScheduleShift): Promise<void> {
        await this.adminShiftScheduleService.getSchudeleShift(shift.id).then((data) => {
            this.selectedShift = data;
        });
        this.selectedShift.shiftMembers.forEach((member) => {
            this.brigadesSubstitution.users.forEach((user) => {
                if (user.id === member.employeeId) {
                    this.activeUsers.select(user);
                }
            });
        });
    }

    public filterBrigade(brigadeUsers: IBrigadeWithUsersDto[]): IBrigadeWithUsersDto[] {
        this.selectedDay.items.forEach((shift) => {
            brigadeUsers = brigadeUsers.filter((val) => val.brigadeId !== shift.brigadeId);
        });
        return brigadeUsers;
    }

    public setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }
}
