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
import { MaterialControllerService } from '../../../services/material-controller.service';

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

    isLoading: boolean = false;

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

    @ViewChild('shiftOverlay', { static: false }) shiftOverlay: ElementRef<HTMLElement>;
    @ViewChild('calendar') calendar: MatCalendar<Date>;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2,
        private adminShiftScheduleService: AdminShiftScheduleService,
        private materialController: MaterialControllerService
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
        this.openOverlay(null, null, false);
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
            this.selectShift(this.selectedDay?.items?.[0]);
        }
        if (this.calendar) {
            this.calendar.updateTodaysDate();
        }
    }

    public async onClickCard(user: IUser): Promise<void> {
        this.isLoading = true;
        if (this.activeUsers.isSelected(user)) {
            try {
                await this.adminShiftScheduleService.deleteMemberFromBrigade(
                    this.selectedShift.id,
                    user.id
                );
                this.activeUsers.deselect(user);
                this.materialController.openSnackBar(
                    `${user.lastName} ${user.firstName} удален из смены`
                );
            } catch (error) {
                this.isLoading = false;
            }
        } else {
            try {
                await this.adminShiftScheduleService.postMemberFromBrigade(
                    this.selectedShift.id,
                    user.id
                );
                this.activeUsers.select(user);
                this.materialController.openSnackBar(
                    `${user.lastName} ${user.firstName} добавлен в смену`
                );
            } catch (error) {
                this.isLoading = false;
            }
        }
        this.isLoading = false;
    }

    public async onChooseBrigade(
        brigade: IBrigadeWithUsersDto,
        selectedDay: IScheduleShiftDay
    ): Promise<void> {
        this.isLoading = true;
        this.openOverlay(null, null, false);
        this.selectedBrigade = brigade;
        try {
            await this.adminShiftScheduleService.postSelectBrigade(
                this.selectedShift.id,
                brigade.brigadeId
            );
            this.reLoadDataMonth();
            this.selectShift(this.selectedShift);
            this.materialController.openSnackBar(`Бригада ${brigade.brigadeNumber} сохранена`);
            selectedDay.items.find((value) => {
                if (value.id === this.selectedShift.id) {
                    value.brigadeId = brigade.brigadeId;
                    value.brigadeName = brigade.brigadeNumber;
                    if (this.calendar) {
                        this.calendar.updateTodaysDate();
                    }
                }
            });
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    async deleteBrigadeFromShift(): Promise<void> {
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService.deleteBrigade(this.selectedShift.id);
            this.materialController.openSnackBar(`Бригада удалена`);
            const sh = this.selectedDay.items.find((val) => val.id === this.selectedShift.id);
            this.openOverlay(null, null, false);
            if (sh) {
                sh.brigadeName = null;
                sh.brigadeId = null;
                this.selectedShift = null;
                this.reLoadDataMonth();
            }
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    public openOverlay(event: MouseEvent, shift: IScheduleShift, isOpen: boolean): void {
        event?.stopPropagation();
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
        this.isLoading = true;
        try {
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
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    // #region DATA API

    public async loadItem(): Promise<void> {
        this.isLoading = true;
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
                this.dateChanged(this.dateNow);
            } catch (err) {
                console.error(err);
            }
        }
        this.isLoading = false;
    }

    // #endregion

    public async selectShift(shift: IScheduleShift): Promise<void> {
        this.isLoading = true;
        if (this.shiftOverlay?.nativeElement.style.display === 'block') {
            this.renderer.setStyle(this.shiftOverlay.nativeElement, 'display', 'none');
        }
        this.activeUsers.clear();
        try {
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
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
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
