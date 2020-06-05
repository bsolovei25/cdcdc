import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { IBrigadeWithUsersDto } from '../../../../../models/admin-shift-schedule';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-admin-shift-brigade',
    templateUrl: './admin-shift-brigade.component.html',
    styleUrls: ['./admin-shift-brigade.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class AdminShiftBrigadeComponent {
    @Input() data: IBrigadeWithUsersDto;

    public isOpen: boolean = true;

    public inputControl: FormControl = new FormControl('');

    constructor(
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService
    ) {}

    public openList(): void {
        this.isOpen = !this.isOpen;
    }

    drop(event: CdkDragDrop<string[]>): void {
        console.log(event);
        this.adminShiftScheduleService.moveItemBrigade$.next(event);
    }

    dragStart(id: string): void {
        this.adminShiftScheduleService.moveItemId$.next(id);
    }

    delete(brigade: IBrigadeWithUsersDto): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить бригаду?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.adminShiftScheduleService.alertWindow$.next(null);
                this.deleteBrigade(brigade);
            },
            closeFunction: () => {
                this.adminShiftScheduleService.alertWindow$.next(null);
            },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    edit(brigade: IBrigadeWithUsersDto): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Переименование бригады',
            acceptText: 'Сохранить',
            cancelText: 'Отмена',
            input: {
                formControl: this.inputControl,
                placeholder: 'Введите название',
            },
            acceptFunction: () => {
                const name = this.inputControl.value;
                this.editBrigade(brigade, name);
                this.adminShiftScheduleService.alertWindow$.next(null);
            },
            closeFunction: () => {
                this.adminShiftScheduleService.alertWindow$.next(null);
            },
        };
        this.adminShiftScheduleService.alertWindow$.next(windowsParam);
    }

    async deleteBrigade(brigade: IBrigadeWithUsersDto): Promise<void> {
        try {
            await this.adminShiftScheduleService.deleteBrigade(brigade.brigadeId);
            this.snackBar.openSnackBar(`Бригада ${brigade.brigadeNumber} удалена`);
            this.adminShiftScheduleService.updateBrigades$.next(true);
        } catch (error) {
            console.error(error);
        }
    }

    async editBrigade(brigade: IBrigadeWithUsersDto, number: string): Promise<void> {
        try {
            const brigadeAns = await this.adminShiftScheduleService.putBrigadeEdit(
                brigade.brigadeId,
                number
            );
            brigade.brigadeNumber = brigadeAns.number;
            this.snackBar.openSnackBar(`Бригада ${brigade.brigadeNumber} переименована`);
        } catch (error) {
            console.error(error);
        }
    }
}
