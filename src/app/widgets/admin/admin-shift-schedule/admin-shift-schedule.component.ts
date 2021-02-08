import {
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    Renderer2,
    OnInit,
    AfterContentChecked,
    ElementRef,
    ChangeDetectorRef,
} from '@angular/core';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatCalendar } from '@angular/material/datepicker';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { IUser } from '../../../dashboard/models/EVJ/events-widget';
import {
    IScheduleShiftDay,
    IScheduleShift,
    IBrigadeWithUsersDto,
    IUnits,
    IUnitSettings,
} from '../../../dashboard/models/ADMIN/admin-shift-schedule';
import { IAlertWindowModel } from '../../../@shared/models/alert-window.model';
import {
    AdminShiftScheduleService,
    IDropItem,
} from '../../../dashboard/services/widgets/admin-panel/admin-shift-schedule.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { fillDataShape } from '@shared/functions/common-functions';
import { Moment } from 'moment';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { from } from 'rxjs';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';

export interface IAbsent {
    code: string;
    id: number;
    name: string;
}

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: 'L | LT',
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'evj-admin-shift-schedule',
    templateUrl: './admin-shift-schedule.component.html',
    styleUrls: ['./admin-shift-schedule.component.scss'],
    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class AdminShiftScheduleComponent
    extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy, AfterContentChecked {
    public readonly iconRoute: string = 'assets/icons/widget-title-icons/';

    compareFn(o1: any, o2: any): boolean {
        return o1.name === o2.name && o1.id === o2.id;
    }

    selected: any;

    public onSelected(event): void {
        if (event) {
            this.selected = event.value;
            this.selectedUnits(this.selected);
        }
    }

    public onSelectedMenu(event: boolean): void {
        this.isSelectMenu = event;
        this.selectedMenu(event);
    }

    defaultLocale: string = 'ru-RU';

    isLoading: boolean = true;

    isSelectMenu: boolean = true;

    public static itemCols: number = 38;
    public static itemRows: number = 25;

    public static minItemCols: number = 38;
    public static minItemRows: number = 25;

    activeUsers: SelectionModel<IUser> = new SelectionModel(true);

    dateNowIcon: Date = new Date();

    dateNow: Date = new Date();
    yesterday: IScheduleShiftDay;

    selectedDay: IScheduleShiftDay;
    selectedShift: IScheduleShift;
    selectedBrigade: IBrigadeWithUsersDto;
    allUnits: IUnits[] = [];
    selectedUnit: IUnits;

    scheduleShiftMonth: IScheduleShiftDay[] = [];

    renderScheduleShiftMonth: IScheduleShift[] = [];

    allUsersUnit: IUser[] = [];
    allBrigade: IBrigadeWithUsersDto[] = [];

    leftBrigades: IBrigadeWithUsersDto[] = [];
    rightBrigades: IBrigadeWithUsersDto[] = [];

    brigadeColors: { color: string; id: number }[] = [];
    allStatus: IAbsent[] = [];

    // TODO Управление расписанием

    isDutySchedule: boolean = true; // показать график дежурств или управление расписанием
    isOpenStartDate: boolean = false; // Открыть/закрыть overlay Начала смены
    timeStart: FormControl = new FormControl(moment().second(0).minutes(0), [Validators.required]);
    timeShift: { isSelected: boolean; value: number }[] = [
        // Длительность смены
        { isSelected: true, value: 6 },
        { isSelected: false, value: 8 },
        { isSelected: false, value: 12 },
    ];
    saveIsDate: Moment = moment().second(0).minutes(0); // ПРименить с:. Без минут и секунд

    //
    public alertWindow: IAlertWindowModel;
    public inputControl: FormControl = new FormControl({ value: '', disabled: false });

    buttons: NodeListOf<HTMLElement>;
    nextAndPreviousMonthVar: (event: MouseEvent) => boolean | void;

    @ViewChild('calendar') calendar: MatCalendar<Date>;
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('menu') menu: ElementRef;

    constructor(
        private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2,
        public adminShiftScheduleService: AdminShiftScheduleService,
        private materialController: SnackBarService,
        protected widgetService: WidgetService,
        private snackBar: SnackBarService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'peoples';
        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target !== this.toggleButton?.nativeElement && e.target !== this.menu?.nativeElement) {
                this.isOpenStartDate = false;
            }
        });
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.setRus();
        this.loadItem();
        this.selectedDay = {
            date: new Date(),
            isAllShiftsSet: true,
            items: [],
        };
        this.dateChanged(this.selectedDay.date);
        this.subscriptions.push(
            this.adminShiftScheduleService.moveItemBrigade$.subscribe((value) => {
                this.moveUsertoBrigade(value);
            }),
            this.adminShiftScheduleService.alertWindow$.subscribe((value) => {
                this.alertWindow = value;
            }),
            this.adminShiftScheduleService.updateBrigades$.subscribe((value) => {
                if (value) {
                    this.getBrigade();
                    this.getUsersUnit();
                    this.reLoadDataMonth();
                }
            }),
            this.adminShiftScheduleService.postAbsent$.subscribe((value) => {
                if (value) {
                    if (value.absentReasonId) {
                        this.postAbsent(value.userId, value.absentReasonId);
                    } else {
                        this.postResetAbsent(value.userId);
                    }
                }
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    protected dataHandler(ref: any): void {}

    ngAfterContentChecked(): void {
        this.listenBtn();
    }

    private resetComponent(factory: boolean = false): void {
        this.yesterday = null;
        this.selectedShift = null;
        this.selectedBrigade = null;
        this.activeUsers.clear();
        if (factory) {
            this.scheduleShiftMonth = [];
        }
    }

    //#region  Calendar

    listenBtn(): void {
        this.buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
        if (this.buttons && !this.nextAndPreviousMonthVar) {
            this.buttons.forEach((button) => {
                if (
                    button.getAttribute('aria-label') === 'Previous month' ||
                    button.getAttribute('aria-label') === 'Next month'
                ) {
                    this.buttons.forEach((value) => {
                        this.renderer.setAttribute(
                            value,
                            'as-platform-testing',
                            value.getAttribute('aria-label') === 'Previous month'
                                ? 'shiftschedule-switch-month-previous'
                                : 'shiftschedule-switch-month-next'
                        );
                    });
                    this.nextAndPreviousMonthVar = this.renderer.listen(button, 'click', () => {
                        if (this.calendar?.activeDate) {
                            this.nextAndPreviousMonth();
                        }
                    });
                }
            });
        }
    }

    private async nextAndPreviousMonth(): Promise<void> {
        if (this.calendar.activeDate !== this.dateNow) {
            this.dateNow = this.calendar.activeDate;
            this.reLoadDataMonth();
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
                        str = 'special-date ';
                    } else {
                        let id = 1;
                        value.items.forEach((item) => {
                            if (item?.brigadeId) {
                                const color = this.brigadeColors.find((val) => val.id === item.brigadeId);
                                if (color) {
                                    str += `item-${id}--${color.color}`;
                                    id++;
                                } else {
                                    str += `item-${id}--color-7`;
                                    id++;
                                }
                            }
                        });
                    }
                }
            });
            return str;
        };
    }

    private async reLoadDataMonth(): Promise<void> {
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService
                .getSchudeleShiftsRenderMonth(
                    this.selectedUnit.id,
                    this.dateNow.getMonth() + 1,
                    this.dateNow.getFullYear()
                )
                .then((data) => {
                    if (data && data.length > 0) {
                        this.scheduleShiftMonth = [];
                        const source = from(data);
                        const example = source.pipe(
                            groupBy((person) => {
                                return `${new Date(person?.start).getFullYear()}.${new Date(
                                    person?.start
                                ).getMonth()}.${new Date(person?.start).getDate()}`;
                            }),
                            mergeMap((group) => group.pipe(toArray()))
                        );
                        const subscribe = example.subscribe((val) => {
                            let isAllShiftsSet = true;
                            val.forEach((value2) => {
                                if (!value2.isBrigadeSet) {
                                    isAllShiftsSet = false;
                                }
                            });
                            this.scheduleShiftMonth.push({
                                date: val[0].start,
                                isAllShiftsSet,
                                items: [...val],
                            });
                        });
                        subscribe.unsubscribe();
                        if (this.calendar) {
                            this.calendar.updateTodaysDate();
                        }
                    } else {
                        this.resetComponent();
                    }
                    this.dateChanged(this.selectedDay.date);
                });
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    //#endregion

    // #region DATA API

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        if (!this.selectedUnit) {
            try {
                await this.adminShiftScheduleService.getUnits().then((data) => {
                    this.allUnits = data;
                    this.selectedUnit = data?.[0];
                });
            } catch (error) {
                console.error(error);
                this.isLoading = false;
            }
        }
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(this.reLoadDataMonth());
        dataLoadQueue.push(this.getBrigade());
        dataLoadQueue.push(
            this.adminShiftScheduleService.getAbsentReasons().then((data) => {
                this.allStatus = data;
            })
        );
        dataLoadQueue.push(this.getUsersUnit());
        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
                this.dateChanged(this.dateNow);
            } catch (err) {
                console.error(err);
                this.isLoading = false;
            }
        }
        this.isLoading = false;
    }

    async getBrigade(): Promise<void> {
        this.adminShiftScheduleService.getBrigades(this.selectedUnit.id).then((data) => {
            this.allBrigade = data;
            this.allBrigade.push({ brigadeId: 0.1, brigadeNumber: 'Бригада удалена' });
            this.mapArrayBrigade(data);
            this.brigadeColors = [];
            this.allBrigade.forEach((item, i) => {
                if (item.brigadeId !== 0.1) {
                    this.brigadeColors.push({ color: `color-${i + 1}`, id: item.brigadeId });
                } else {
                    this.brigadeColors.push({ color: `color-delete`, id: 0.1 });
                }
            });
            this.adminShiftScheduleService.brigadeColor$.next(this.brigadeColors);
        });
    }

    async getUsersUnit(): Promise<void> {
        try {
            this.adminShiftScheduleService.getShiftUsers(this.selectedUnit.id).then((data) => {
                this.allUsersUnit = data;
            });
        } catch (error) {
            console.log(error);
        }
    }

    public async selectedUnits(event: IUnits): Promise<void> {
        if (event) {
            this.selectedUnit = event;
            this.resetComponent(true);
            await this.loadItem();
            this.nextAndPreviousMonthVar = null;
            this.listenBtn();
            await this.getUnitSettings();
        }
    }

    public async selectShift(shift: IScheduleShift): Promise<void> {
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService.getSchudeleShift(shift.id).then((data) => {
                this.selectedShift = data;
            });
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    public async deleteBrigadeFromShift(event: MouseEvent, shift: IScheduleShift): Promise<void> {
        event.stopPropagation();
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService.deleteBrigadeFromShift(shift.id);
            this.materialController.openSnackBar(`Бригада удалена`);
            const sh = this.selectedDay.items.find((val) => val.id === shift.id);
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

    public async resetBrigadesFromShifts(): Promise<void> {
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService.resetTodayBrigades(this.selectedUnit.id);
            this.materialController.openSnackBar(`Выполнено`);
            this.reLoadDataMonth();
        } catch (error) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }

    public async onChooseBrigade(brigade: IBrigadeWithUsersDto, selectedDay: IScheduleShiftDay): Promise<void> {
        this.isLoading = true;
        this.selectedBrigade = brigade;
        try {
            await this.adminShiftScheduleService.postSelectBrigade(this.selectedShift.id, brigade.brigadeId);
            this.reLoadDataMonth();
            this.selectShift(this.selectedShift);
            this.materialController.openSnackBar(`Бригада ${brigade.brigadeNumber} назначена`);
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

    async deleteMemberFromBrigade(user: IUser): Promise<void> {
        try {
            await this.adminShiftScheduleService.deleteMemberFromBrigade(this.selectedShift.id, user.id);
            this.selectShift(this.selectedShift);
            this.materialController.openSnackBar(`${user.lastName} ${user.firstName} удален из смены`);
        } catch (error) {
            this.isLoading = false;
        }
    }

    // #endregion

    // #region Methods

    public selectedMenu(event: boolean): void {
        this.isSelectMenu = event;
    }

    public dateChanged(event: Date): void {
        this.isLoading = true;
        this.resetComponent();
        this.openOverlay(null, null, false);
        const idx = this.scheduleShiftMonth.findIndex((val) => {
            return (
                new Date(val.date).getFullYear() === new Date(event).getFullYear() &&
                new Date(val.date).getDate() === new Date(event).getDate() &&
                new Date(val.date).getMonth() === new Date(event).getMonth()
            );
        });
        if (idx !== -1) {
            const day = fillDataShape(this.scheduleShiftMonth[idx]);
            this.selectedDay = day;
            this.selectedDay.date = new Date(this.selectedDay.date);
            const yesterdayLocal = new Date(moment(this.selectedDay.date).subtract(1, 'days').toDate());
            const idxYesterday = this.scheduleShiftMonth.findIndex(
                (val) =>
                    new Date(val.date).getFullYear() === new Date(yesterdayLocal).getFullYear() &&
                    new Date(val.date).getDate() === new Date(yesterdayLocal).getDate() &&
                    new Date(val.date).getMonth() === new Date(yesterdayLocal).getMonth()
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
        this.isLoading = false;
    }

    public openOverlay(event: MouseEvent, shift: IScheduleShift, isOpen: boolean): void {
        event?.stopPropagation();
        this.selectedShift = shift;
    }

    public filterBrigade(brigadeUsers: IBrigadeWithUsersDto[]): IBrigadeWithUsersDto[] {
        this.selectedDay.items.forEach((shift) => {
            brigadeUsers = brigadeUsers.filter((val) => val?.brigadeId !== shift?.brigadeId);
        });
        return brigadeUsers;
    }

    public setRus(): void {
        this.dateAdapter.setLocale('ru');
        this.dateAdapter.getFirstDayOfWeek = () => {
            return 1;
        };
    }

    drop(event: CdkDragDrop<string[]>): void {}

    async moveToDropAdditionalShift(item: IDropItem): Promise<void> {
        if (item && item.container.id !== '0' && item.container.id !== item.previousContainer.id) {
            try {
                const userId = this.adminShiftScheduleService.moveItemId$.getValue();
                await this.adminShiftScheduleService.postMemberFromBrigade(this.selectedShift.id, userId);
                this.selectShift(this.selectedShift);
                this.snackBar.openSnackBar('Сотрудник добавлен в смену');
            } catch (error) {
                console.log(error);
            }
        }
    }

    // #endregion

    mapArrayBrigade(data: IBrigadeWithUsersDto[]): void {
        this.rightBrigades = [];
        this.leftBrigades = [];
        data.forEach((el, i) => {
            if (el.brigadeId !== 0.1) {
                if (i % 2 === 0) {
                    this.leftBrigades.push(el);
                } else {
                    this.rightBrigades.push(el);
                }
            }
        });
    }

    async postBrigade(): Promise<void> {
        this.inputControl.setValue('');
        this.alertWindow = {
            isShow: true,
            questionText: 'Введите название новой бригады',
            acceptText: ' Добавить',
            cancelText: 'Отмена',
            input: {
                formControl: this.inputControl,
                placeholder: 'Введите название',
            },
            acceptFunction: async (): Promise<void> => {
                const name = this.inputControl.value;
                this.alertWindow = null;
                this.isLoading = true;
                try {
                    await this.adminShiftScheduleService.postBrigade(this.selectedUnit, name);
                    this.getBrigade();
                    this.snackBar.openSnackBar(`Бригада ${name} добавлена`);
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            cancelFunction: () => {
                this.alertWindow = null;
            },
            closeFunction: () => {
                this.alertWindow = null;
            },
        };
    }

    async moveUsertoBrigade(item: IDropItem): Promise<void> {
        if (item && item.container.id !== '0' && item.container.id !== item.previousContainer.id) {
            try {
                const userId = this.adminShiftScheduleService.moveItemId$.getValue();
                await this.adminShiftScheduleService.postUsertoBrigade(userId, item.container.id);
                this.snackBar.openSnackBar('Сотрудник добавлен в бригаду');
                this.getBrigade();
                this.getUsersUnit();
            } catch (error) {
                console.log(error);
            }
        }
    }

    brigadeColor(brigade: IBrigadeWithUsersDto): string {
        return this.brigadeColors.find((val) => val?.id === brigade?.brigadeId)?.color;
    }

    async postAbsent(userId: number, absentReasonId: number): Promise<void> {
        try {
            await this.adminShiftScheduleService.postAbsent(this.selectedShift.id, userId, absentReasonId);
            this.selectShift(this.selectedShift);
            this.snackBar.openSnackBar('Статус обновлен');
        } catch (error) {
            console.error(error);
        }
    }

    async postResetAbsent(userId: number): Promise<void> {
        try {
            await this.adminShiftScheduleService.postMemberRestore(this.selectedShift.id, userId);
            this.selectShift(this.selectedShift);
            this.snackBar.openSnackBar('Статус обновлен');
        } catch (error) {
            console.error(error);
        }
    }

    changeDutySchedule(isLeftButton: boolean): void {
        this.isDutySchedule = isLeftButton;
    }

    openBlock(): void {
        this.isOpenStartDate = !this.isOpenStartDate;
    }

    async scheduleManagement(): Promise<void> {
        const body: IUnitSettings = {
            unitId: this.selectedUnit.id,
            shiftLengthHours: this.timeShift.find((item) => item.isSelected).value,
            shiftStartOffset: this.timeStart.value.hours(),
            applyFrom: `${this.saveIsDate.year()}-${this.saveIsDate.month() + 1 < 10 ? 0 : ''}${
                this.saveIsDate.month() + 1
            }-${this.saveIsDate.date() + 1 < 10 ? 0 : ''}${this.saveIsDate.date()}`,
        };
        try {
            await this.adminShiftScheduleService.checkUnitSettings(this.selectedUnit.id, body);
            this.isLoading = true;
            await this.adminShiftScheduleService.saveUnitSettings(this.selectedUnit.id, body);
            await this.getUnitSettings();
            setTimeout(() => (this.isLoading = false), 500);
        } catch (error) {
            if (error.status === 477 && error.error.messages[0].type === 'warning') {
                this.alertWindow = {
                    acceptText: 'Сохранить',
                    cancelText: 'Отменить',
                    closeFunction: () => (this.alertWindow.isShow = false),
                    acceptFunction: async () => {
                        this.isLoading = true;
                        await this.adminShiftScheduleService.saveUnitSettings(this.selectedUnit.id, body);
                        const resp = await this.adminShiftScheduleService.getActualUnitSettings(this.selectedUnit.id);
                        await this.getUnitSettings();
                        this.resetComponent(true);
                        this.loadItem();

                        setTimeout(() => (this.isLoading = false), 500);
                    },
                    questionText: error.error.messages[0].message,
                    isShow: true,
                };
            }
        }
    }

    private async getUnitSettings(): Promise<void> {
        const data: IUnitSettings = await this.adminShiftScheduleService.getActualUnitSettings(this.selectedUnit.id);
        this.timeStart.setValue(moment().hours(data.shiftStartOffset).minutes(0).seconds(0));
        this.timeShift.forEach((item) => (item.isSelected = false));
        this.timeShift.find((item) => item.value === data.shiftLengthHours).isSelected = true;
        this.saveIsDate = moment(data.applyFrom);
    }

    selectTimeShift(time: { isSelected: boolean; value: number }): void {
        this.timeShift.map((value) => {
            if (value === time) {
                value.isSelected = true;
            } else {
                value.isSelected = false;
            }
        });
    }
}
