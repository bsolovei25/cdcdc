import {
    Component,
    Input,
    OnInit,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    Renderer2,
    ViewChildren,
    QueryList,
    Output,
    EventEmitter,
} from '@angular/core';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { IUser } from '../../../../../models/events-widget';
import { AvatarConfiguratorService } from '../../../../../services/avatar-configurator.service';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';
import { IAbsent } from '../../admin-shift-schedule.component';

@Component({
    selector: 'evj-admin-shift-info-employee',
    templateUrl: './admin-shift-info-employee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-shift-info-employee.component.scss'],
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
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

    @ViewChild('statusOverlay') statusOverlay: ElementRef<HTMLElement>;

    constructor(
        private avatarConfiguratorService: AvatarConfiguratorService,
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService,
        private renderer: Renderer2
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

    changeStatus(): void {}

    public openOverlay(event: MouseEvent): void {
        event?.stopPropagation();
        console.log(this.statusOverlay?.nativeElement);
        if (this.statusOverlay?.nativeElement) {
            if (!this.isOpen) {
                this.renderer.setStyle(this.statusOverlay.nativeElement, 'display', 'block');
                this.isOpen = true;
            } else {
                this.renderer.setStyle(this.statusOverlay.nativeElement, 'display', 'none');
                this.isOpen = false;
            }
        }
    }

    onChooseStatus(status: IAbsent): void {
        this.adminShiftScheduleService.postAbsent$.next({
            userId: this.data?.id,
            absentReasonId: status?.id,
        });
    }
}
