import {
    Component,
    OnInit,
    Input,
    TemplateRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { IUser } from '../../../../../models/events-widget';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminShiftScheduleService } from '../../../../../services/widgets/admin-shift-schedule.service';
import { IBrigadeWithUsersDto } from '../../../../../models/admin-shift-schedule';

@Component({
    selector: 'evj-admin-shift-list-employees',
    templateUrl: './admin-shift-list-employees.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-shift-list-employees.component.scss'],
})
export class AdminShiftListEmployeesComponent implements OnInit {
    // @Input() template: TemplateRef<any>;
    @Input() public data: IUser[] = [];
    brigadeColors: { color: string; id: number }[] = [];

    constructor(
        private adminShiftScheduleService: AdminShiftScheduleService,
        private chDet: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.adminShiftScheduleService.brigadeColor$.subscribe((value) => {
            if (value) {
                this.brigadeColors = value;
                this.chDet.detectChanges();
            }
        });
    }

    dragStart(id: number): void {
        this.adminShiftScheduleService.moveItemId$.next(id);
    }

    drop(event: CdkDragDrop<string[]>): void {
        this.adminShiftScheduleService.moveItemBrigade$.next(event);
    }

    brigadeColor(user: IUser): string {
        return this.brigadeColors.find((val) => val?.id === user?.brigade?.id)?.color;
    }
}
