import { Component, Input, OnInit } from '@angular/core';
import { IAdminShiftUserBrigade } from '../../admin-shift-schedule.component';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { EventService } from '../../../../../services/widgets/event.service';
import { IUser } from '../../../../../models/events-widget';
import { AvatarConfiguratorService } from '../../../../../services/avatar-configurator.service';

@Component({
    selector: 'evj-admin-shift-info-employee',
    templateUrl: './admin-shift-info-employee.component.html',
    styleUrls: ['./admin-shift-info-employee.component.scss'],
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
    @Input() public data: IUser;
    @Input() public garbage: boolean;
    @Input() public star: boolean = false;

    photoPath: string = '';

    constructor(
        private avatarConfiguratorService: AvatarConfiguratorService,
        private adminShiftScheduleService: AdminShiftScheduleService
    ) {}

    ngOnInit(): void {
        this.loadItem();
    }

    delete(): void {
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить сотрудника?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.adminShiftScheduleService.closeAlert(),
            closeFunction: () => {
                this.adminShiftScheduleService.closeAlert();
            },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    private async loadItem(): Promise<void> {
        console.log(this.data);

        this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data?.photoId);
    }

    changeStatus(): void {}
}
