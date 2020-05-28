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
import { AdminShiftScheduleService } from '../../../services/widgets/admin-shift-schedule.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

    public static minItemCols: number = 26;
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

    allBrigade: IBrigadeWithUsersDto[] = [];
    brigadesSubstitution: IBrigadeWithUsersDto;

    buttons: NodeListOf<HTMLElement>;
    nextAndPreviousMonthVar: (event: MouseEvent) => boolean | void;

    @ViewChild('shiftOverlay') shiftOverlay: ElementRef<HTMLElement>;
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
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'peoples';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.mapArrayBrigade(this.dataBrig);
    }

    mapArrayBrigade(data): void {
        data.forEach(el => {
            this.list.push((el.id).toString());
            if (el.id % 2 === 0) {
                this.dataBrigLeft.push(el);
            } else {
                this.dataBrigRight.push(el);
            }

            /// mock push in arrayUserBrigade
            el.brigade.forEach(item => {
                this.arrayUserBrigade.push(item);
            })
        });

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
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }

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
        dataLoadQueue.push(
            this.adminShiftScheduleService.getBrigades(this.selectedUnit.id).then((data) => {
                this.allBrigade = data;
            })
        );
        dataLoadQueue.push(
            this.adminShiftScheduleService.getBrigadesSubstitution().then((data) => {
                this.brigadesSubstitution = data;
            })
        );
        dataLoadQueue.push();
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

    public async deleteBrigadeFromShift(event: MouseEvent, shift: IScheduleShift): Promise<void> {
        event.stopPropagation();
        this.isLoading = true;
        try {
            await this.adminShiftScheduleService.deleteBrigade(shift.id);
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
        this.openOverlay(null, null, false);
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

    public async onClickWorkerCard(user: IUser): Promise<void> {
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

    // #endregion

    // #region Methods

    private async nextAndPreviousMonth(): Promise<void> {
        if (this.calendar.activeDate !== this.dateNow) {
            this.dateNow = this.calendar.activeDate;
            this.reLoadDataMonth();
        }
    }

    public selectedMenu(event: boolean): void {
        this.isSelectMenu = event;
    }

    public dateChanged(event: Date): void {
        this.isLoading = true;
        this.resetComponent();
        this.openOverlay(null, null, false);
        const idx = this.scheduleShiftMonth.findIndex(
            (val) => {
                return new Date(val.date).getFullYear() === new Date(event).getFullYear()
                    && new Date(val.date).getDate() === new Date(event).getDate()
                    && new Date(val.date).getMonth() === new Date(event).getMonth();
            }
        );
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
                (val) => new Date(val.date).getFullYear() === new Date(yesterdayLocal).getFullYear()
                    && new Date(val.date).getDate() === new Date(yesterdayLocal).getDate()
                    && new Date(val.date).getMonth() === new Date(yesterdayLocal).getMonth()
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
            shiftMembers = shiftMembers.filter((member) => member?.employee?.id !== user?.id);
            const index: number = shiftMembers.findIndex((item) => item.position === 'responsible');
            const mainWorker = shiftMembers.splice(index, 1)[0];
            shiftMembers.unshift(mainWorker);
        });
        return shiftMembers;
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

    drop(event: CdkDragDrop<string[]>) {
        if (event.container.id === event.previousContainer.id) {
            const brig = this.dataBrig.findIndex(e => (e.id).toString() === event.container.id);
            //  moveItemInArray(this.list[brig].brigade, event.previousIndex, event.currentIndex);
        } else {
            const brigadeIndex = this.dataBrig.findIndex(e => (e.id).toString() === event.container.id);
            this.dataBrig[brigadeIndex].brigade.push(this.dragUniqElem);
        }
    }

    dragStart(event, id) {
        //this.dragUniqElem = this.dataBrig[event.source.dropContainer.id].brigade.find(el => el.id === id);
        this.dragUniqElem = this.arrayUserBrigade.find(el => el.id === id);
    }

    // #endregion
}
