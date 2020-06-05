import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { IUser } from '../../../../../models/events-widget';
import { AvatarConfiguratorService } from '../../../../../services/avatar-configurator.service';

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
            // acceptFunction: () => this.adminShiftScheduleService.closeAlert(),
            // closeFunction: () => {
            //     this.adminShiftScheduleService.closeAlert();
            // },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    private async loadItem(): Promise<void> {
        this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data?.photoId);
    }

    changeStatus(): void {}
}
