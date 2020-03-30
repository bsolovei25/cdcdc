import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IGroup } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-ag-new-group',
    templateUrl: './ag-new-group.component.html',
    styleUrls: ['./ag-new-group.component.scss'],
})
export class AgNewGroupComponent implements OnInit {
    @Output() private newGroup: EventEmitter<IGroup> = new EventEmitter<IGroup>();

    public groupName: FormControl = new FormControl('', Validators.required);

    constructor() {}

    public ngOnInit(): void {}

    public onBack(): void {
        this.newGroup.emit(null);
    }

    public onSave(): void {
        if (this.groupName.value) {
            const group: IGroup = {
                id: null,
                name: this.groupName.value,
                claims: [],
                users: [],
            };
            this.newGroup.emit(group);
        } else {
            this.groupName.markAsTouched();
        }
    }
}
