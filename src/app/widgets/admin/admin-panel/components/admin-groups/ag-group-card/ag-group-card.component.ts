import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGroup } from '../../../../../../dashboard/models/ADMIN/admin-panel.model';

@Component({
    selector: 'evj-ag-group-card',
    templateUrl: './ag-group-card.component.html',
    styleUrls: ['./ag-group-card.component.scss'],
})
export class AgGroupCardComponent implements OnInit {
    @Input() public group: IGroup = null;
    @Input() public isCardActive: boolean = false;

    @Output() private editGroup: EventEmitter<void> = new EventEmitter<void>();
    @Output() private deleteGroup: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public ngOnInit(): void {}

    public onDeleteGroup(): void {
        this.deleteGroup.emit();
    }

    public onEditGroup(): void {
        this.editGroup.emit();
    }
}
