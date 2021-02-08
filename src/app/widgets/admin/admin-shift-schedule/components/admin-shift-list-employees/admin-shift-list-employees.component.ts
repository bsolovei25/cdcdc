import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IUser } from '../../../../../dashboard/models/EVJ/events-widget';
import { AdminShiftScheduleService } from '../../../../../dashboard/services/widgets/admin-panel/admin-shift-schedule.service';

interface IShiftList extends IUser {
    isNotVisible?: boolean;
}

@Component({
    selector: 'evj-admin-shift-list-employees',
    templateUrl: './admin-shift-list-employees.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-shift-list-employees.component.scss'],
})
export class AdminShiftListEmployeesComponent implements OnInit {
    // @Input() template: TemplateRef<any>;
    @Input() public data: IShiftList[] = [];

    brigadeColors: { color: string; id: number }[] = [];

    constructor(private adminShiftScheduleService: AdminShiftScheduleService, private chDet: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.adminShiftScheduleService.brigadeColor$.subscribe((value) => {
            if (value) {
                this.brigadeColors = value;
                this.chDet.detectChanges();
            }
        });
        this.data.map((value) => {
            value.isNotVisible = false;
        });
        this.chDet.detectChanges();
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

    search(event: string): void {
        this.data.map((value) => {
            if (
                value.firstName.toLowerCase().includes(event.trim().toLowerCase()) ||
                value.lastName.toLowerCase().includes(event.trim().toLowerCase())
            ) {
                value.isNotVisible = false;
            } else {
                value.isNotVisible = true;
            }
        });
    }
}
