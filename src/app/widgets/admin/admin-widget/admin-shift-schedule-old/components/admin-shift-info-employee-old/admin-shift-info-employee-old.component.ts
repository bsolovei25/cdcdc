import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-panel/admin-shift-schedule.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';
import { IAbsent } from '../../../../../../widgets/admin/admin-shift-schedule/admin-shift-schedule.component';
import { IUser } from 'src/app/dashboard/models/EVJ/events-widget';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';


@Component({
    selector: 'evj-admin-shift-info-employee-old',
    templateUrl: './admin-shift-info-employee-old.component.html',
    styleUrls: ['./admin-shift-info-employee-old.component.scss'],
})
export class AdminShiftInfoEmployeeOldComponent implements OnInit {
    @Input() public data: IUser;
    @Input() public garbage: boolean;
    @Input() public garbageShift: boolean;
    @Input() public star: boolean = false;
    @Input() brigade: boolean = false;
    @Input() allStatus: IAbsent[] = [];
    @Input() absentReason: IAbsent;

    @Input() colorBrigade: string;
    photoPath: string = '';
    isOpen: boolean = false;

    @Output() deleteMemberFromShift: EventEmitter<IUser> = new EventEmitter<IUser>();

    constructor(
        private avatarConfiguratorService: AvatarConfiguratorService,
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService
    ) { }

    ngOnInit(): void {
        this.loadItem();
    }

    private async loadItem(): Promise<void> {
        try {
            this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data?.photoId);
        } catch (error) { }
    }

    delete(): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы точно хотите удалить сотрудника из бригады',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.resetUserBrigade();
                this.adminShiftScheduleService.alertWindow$.next(null);
                this.snackBar.openSnackBar(`Сотрудник удален из бригады`);
            },
            closeFunction: () => {
                this.adminShiftScheduleService.alertWindow$.next(null);
            },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    deleteUserShift(): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы точно хотите удалить сотрудника из смены',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.deleteMemberFromShift.emit(this.data);
            },
            closeFunction: () => {
                this.adminShiftScheduleService.alertWindow$.next(null);
            },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    async resetUserBrigade(): Promise<void> {
        try {
            await this.adminShiftScheduleService.postUserBrigadeReset(this.data.id);
            this.adminShiftScheduleService.updateBrigades$.next(true);
        } catch (error) {
            console.log(error);
        }
    }

    async postUserResponsible(): Promise<void> {
        try {
            await this.adminShiftScheduleService.postUserResponsible(this.data.id);
            this.snackBar.openSnackBar(
                `${this.data.firstName} ${this.data.lastName} главный в бригаде`
            );
            this.adminShiftScheduleService.updateBrigades$.next(true);
        } catch (error) {
            console.error(error);
        }
    }

    changeStatus(): void { }

    onChooseStatus(status: IAbsent): void {
        this.adminShiftScheduleService.postAbsent$.next({
            userId: this.data?.id,
            absentReasonId: status?.id,
        });
    }

    onDeleteStatus(): void {
        this.adminShiftScheduleService.postAbsent$.next({
            userId: this.data?.id,
        });
    }
}
