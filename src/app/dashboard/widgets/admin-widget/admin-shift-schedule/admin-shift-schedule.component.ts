import {
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    AfterContentChecked,
} from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { IUser } from '../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';
import {
    IBrigadeWithUsersDto,
    IScheduleShiftDay,
    IScheduleShift,
    IShiftMember,
    IUnits,
} from '../../../models/admin-shift-schedule';
import { fillDataShape } from '../../../../@shared/common-functions';
import { MatCalendar } from '@angular/material/datepicker';
import { WidgetPlatform } from '../../../models/widget-platform';
import { SnackBarService } from '../../../services/snack-bar.service';
import {
    AdminShiftScheduleService,
    IDropItem,
} from '../../../services/widgets/admin-shift-schedule.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, transition, style, animate } from '@angular/animations';
import { IAlertWindowModel } from '../../../../@shared/models/alert-window.model';
import { FormControl } from '@angular/forms';
import { EventService } from '../../../services/widgets/event.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

export interface IAdminShiftBrigade {
    id: number;
    brigade: IAdminShiftUserBrigade[];
    manager: IAdminShiftUserBrigade[];
}

export interface IAdminShiftUserBrigade {
    id: number;
    fio: string;
    specialty: string;
    avatar: string;
    brigade: number;
}

export interface IAbsent {
    code: string;
    id: number;
    name: string;
}

@Component({
    selector: 'evj-admin-shift-schedule',
    templateUrl: './admin-shift-schedule.component.html',
    styleUrls: ['./admin-shift-schedule.component.scss'],
})
export class AdminShiftScheduleComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterContentChecked {
    defaultLocale: string = 'ru-RU';

    isLoading: boolean = true;

    isSelectMenu: boolean = true;

    public static itemCols: number = 38;
    public static itemRows: number = 25;

    public static minItemCols: number = 38;
    public static minItemRows: number = 25;

    activeUsers: SelectionModel<IUser> = new SelectionModel(true);

    dateNowIcon: Date = new Date(); // только для иконки

    dateNow: Date = new Date();
    yesterday: IScheduleShiftDay;

    selectedDay: IScheduleShiftDay;
    selectedShift: IScheduleShift;
    selectedBrigade: IBrigadeWithUsersDto;
    allUnits: IUnits[] = [];
    selectedUnit: IUnits;

    scheduleShiftMonth: IScheduleShiftDay[] = [];

    allUsersUnit: IUser[] = [];
    allBrigade: IBrigadeWithUsersDto[] = [];

    leftBrigades: IBrigadeWithUsersDto[] = [];
    rightBrigades: IBrigadeWithUsersDto[] = [];

    brigadeColors: { color: string; id: number }[] = [];

    allStatus: IAbsent[] = [];

    public alertWindow: IAlertWindowModel;
    public inputControl: FormControl = new FormControl('');

    buttons: NodeListOf<HTMLElement>;
    nextAndPreviousMonthVar: (event: MouseEvent) => boolean | void;

    @ViewChild('calendar') calendar: MatCalendar<Date>;


    //Mock data
    public dataBrig: IAdminShiftBrigade[] = [
        {
            id: 1,
            manager: [
                {
                    id: 4,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Главный',
                    avatar: 'slesar',
                    brigade: 1,
                }
            ],
            brigade: [
                {
                    id: 1,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 1,
                },
                {
                    id: 2,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 2,
                }, {
                    id: 3,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 3,
                },
            ]
        },
        {
            id: 2,
            manager: [
                {
                    id: 4,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Главный',
                    avatar: 'slesar',
                    brigade: 1,
                }
            ],
            brigade: [
                {
                    id: 1,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 1,
                },
                {
                    id: 2,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 2,
                }, {
                    id: 3,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 3,
                },
            ]
        },
        {
            id: 3,
            manager: [
                {
                    id: 4,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Главный',
                    avatar: 'slesar',
                    brigade: 1,
                }
            ],
            brigade: [
                {
                    id: 1,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 1,
                },
                {
                    id: 2,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 2,
                }, {
                    id: 3,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 3,
                },
            ]
        },
        {
            id: 4,
            manager: [
                {
                    id: 4,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Главный',
                    avatar: 'slesar',
                    brigade: 1,
                }
            ],
            brigade: [
                {
                    id: 1,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 1,
                },
                {
                    id: 2,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 2,
                }, {
                    id: 3,
                    fio: 'Иванов Иван Иванович',
                    specialty: 'Слесарь АСУ ТП',
                    avatar: 'slesar',
                    brigade: 3,
                },
            ]
        },
    ]
    public dragUniqElem: IAdminShiftUserBrigade;
    public list: number[] = [0];
    public dataBrigLeft: IAdminShiftBrigade[] = [];
    public dataBrigRight: IAdminShiftBrigade[] = [];
    public arrayUserBrigade: IAdminShiftUserBrigade[] = []; /// ДОЛЖЕН БЫТЬ СПИСОК ЮЗЕРОВ !!!

    constructor(
        private dateAdapter: DateAdapter<Date>,
        private renderer: Renderer2,
        public adminShiftScheduleService: AdminShiftScheduleService,
        private materialController: SnackBarService,
        protected widgetService: WidgetService,
        private snackBar: SnackBarService,
        private eventService: EventService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'peoples';
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
                        str = 'special-date';
                    } else {
                        let id = 1;
                        value.items.forEach((item) => {
                            if (item?.brigadeId) {
                                const color = this.brigadeColors.find(
                                    (val) => val.id === item.brigadeId
                                );
                                if (color) {
                                    str += `item-${id}--${color.color}`;
                                    id++;
                                } else {
                                    // str += `--color-0`;
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
                .getSchudeleShiftsMonth(
                    this.selectedUnit.id,
                    this.dateNow.getMonth() + 1,
                    this.dateNow.getFullYear()
                )
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
            this.mapArrayBrigade(data);
            this.brigadeColors = [];
            this.allBrigade.forEach((item, i) => {
                this.brigadeColors.push({ color: `color-${i + 1}`, id: item.brigadeId });
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

    public async onChooseBrigade(
        brigade: IBrigadeWithUsersDto,
        selectedDay: IScheduleShiftDay
    ): Promise<void> {
        this.isLoading = true;
        this.selectedBrigade = brigade;
        try {
            await this.adminShiftScheduleService.postSelectBrigade(
                this.selectedShift.id,
                brigade.brigadeId
            );
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
            await this.adminShiftScheduleService.deleteMemberFromBrigade(
                this.selectedShift.id,
                user.id
            );
            this.selectShift(this.selectedShift);
            this.materialController.openSnackBar(
                `${user.lastName} ${user.firstName} удален из смены`
            );
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
            const yesterdayLocal = new Date(
                moment(this.selectedDay.date)
                    .subtract(1, 'days')
                    .toDate()
            );
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
                await this.adminShiftScheduleService.postMemberFromBrigade(
                    this.selectedShift.id,
                    userId
                );
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
            if (i % 2 === 0) {
                this.leftBrigades.push(el);
            } else {
                this.rightBrigades.push(el);
            }
        });
    }

    async postBrigade(): Promise<void> {
        this.inputControl.setValue('');
        this.alertWindow = {
            isShow: true,
            questionText: 'Введите название новой бригадды',
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
            await this.adminShiftScheduleService.postAbsent(
                this.selectedShift.id,
                userId,
                absentReasonId
            );
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
}
