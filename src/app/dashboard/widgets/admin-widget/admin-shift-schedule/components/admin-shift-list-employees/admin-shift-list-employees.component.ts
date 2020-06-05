import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../../../../../models/events-widget';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminShiftScheduleService } from '../../../../../services/widgets/admin-shift-schedule.service';

@Component({
    selector: 'evj-admin-shift-list-employees',
    templateUrl: './admin-shift-list-employees.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-shift-list-employees.component.scss'],
})
export class AdminShiftListEmployeesComponent implements OnInit {
    // @Input() template: TemplateRef<any>;
    @Input() public data: IUser[] = [];

    constructor(private adminShiftScheduleService: AdminShiftScheduleService) {}

    ngOnInit(): void {
        console.log(this.data);
    }

    dragStart(id: string): void {
        console.log(id);

        this.adminShiftScheduleService.moveItemId.next(id);
    }

    drop(event: CdkDragDrop<string[]>): void {
        console.log(event);
        this.adminShiftScheduleService.moveItemBrigade.next(event);
        // if (event.container.id === event.previousContainer.id) {
        //     const brig = this.dataBrig.findIndex((e) => e.id.toString() === event.container.id);
        //     //  moveItemInArray(this.list[brig].brigade,
        // event.previousIndex, event.currentIndex);
        // } else {
        //     const brigadeIndex = this.dataBrig.findIndex(
        //         (e) => e.id.toString() === event.container.id
        //     );
        //     this.dataBrig[brigadeIndex].brigade.push(this.dragUniqElem);
        // }
    }
}
