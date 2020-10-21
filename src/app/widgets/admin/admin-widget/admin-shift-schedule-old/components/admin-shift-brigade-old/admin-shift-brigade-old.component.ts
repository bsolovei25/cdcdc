import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-panel/admin-shift-schedule.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';
import { FormControl } from '@angular/forms';
import { IBrigadeWithUsersDto } from 'src/app/dashboard/models/ADMIN/admin-shift-schedule';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-admin-shift-brigade-old',
    templateUrl: './admin-shift-brigade-old.component.html',
    styleUrls: ['./admin-shift-brigade-old.component.scss'],
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
export class AdminShiftBrigadeOldComponent {
    @Input() data: IBrigadeWithUsersDto;

    public isOpen: boolean = true;

    public inputControl: FormControl = new FormControl('');

    @Input() color: string = '';

    constructor(
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService
    ) { }

    public openList(): void {
        this.isOpen = !this.isOpen;
    }

    drop(event: CdkDragDrop<string[]>): void {
        this.adminShiftScheduleService.moveItemBrigade$.next(event);
    }

    dragStart(id: number): void {
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
        this.inputControl.setValue(brigade.brigadeNumber);
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
            cancelFunction: () => {
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
