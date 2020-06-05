import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { IUser } from '../../../../../models/events-widget';
import { AvatarConfiguratorService } from '../../../../../services/avatar-configurator.service';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';

@Component({
    selector: 'evj-admin-shift-info-employee',
    templateUrl: './admin-shift-info-employee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-shift-info-employee.component.scss'],
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
    @Input() public data: IUser;
    @Input() public garbage: boolean;
    @Input() public star: boolean = false;
    @Input() brigade: boolean = false;
    @Input() set brigadeColors(value: { color: string; id: number }[]) {
        if (value?.length) {
            this.color = value.find((val) => val?.id === this.data?.id)?.color;
        }
    }

    color: string = '';

    photoPath: string = '';

    constructor(
        private avatarConfiguratorService: AvatarConfiguratorService,
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService
    ) {}

    ngOnInit(): void {
        this.loadItem();
    }

    private async loadItem(): Promise<void> {
        try {
            this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data?.photoId);
        } catch (error) {}
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

    changeStatus(): void {}
}
