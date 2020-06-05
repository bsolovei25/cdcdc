import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';
import { IAdminShiftUserBrigade } from '../../admin-shift-schedule.component';
import { IBrigadeWithUsersDto } from '../../../../../models/admin-shift-schedule';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IAlertWindowModel } from '../../../../../../@shared/models/alert-window.model';
import { SnackBarService } from '../../../../../services/snack-bar.service';

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
export class AdminShiftBrigadeComponent implements OnInit {
    @Input() data: IBrigadeWithUsersDto[];

    public isOpen: boolean = true;

    constructor(
        private adminShiftScheduleService: AdminShiftScheduleService,
        private snackBar: SnackBarService
    ) {}

    ngOnInit(): void {}

    public openList(): void {
        this.isOpen = !this.isOpen;
    }

    drop(event: CdkDragDrop<string[]>): void {
        console.log(event);
        this.adminShiftScheduleService.moveItemBrigade.next(event);
        // if (event.container.id === event.previousContainer.id) {
        //     const brig = this.dataBrig.findIndex((e) => e.id.toString() === event.container.id);
        //     //  moveItemInArray(this.list[brig].brigade, event.previousIndex, event.currentIndex);
        // } else {
        //     const brigadeIndex = this.dataBrig.findIndex(
        //         (e) => e.id.toString() === event.container.id
        //     );
        //     this.dataBrig[brigadeIndex].brigade.push(this.dragUniqElem);
        // }
    }

    dragStart(id: string): void {
        this.adminShiftScheduleService.moveItemId.next(id);
    }

    delete(brigade: IBrigadeWithUsersDto): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить бригаду?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.deleteBrigade(brigade);
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
            this.adminShiftScheduleService.deleteBrigade(brigade.brigadeId);
        } catch (error) {
            this.snackBar.openSnackBar(`Бригада ${brigade.brigadeNumber} удалена`);
        }
    }
}
