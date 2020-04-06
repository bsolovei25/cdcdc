import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IGroup } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-ag-new-group',
    templateUrl: './ag-new-group.component.html',
    styleUrls: ['./ag-new-group.component.scss'],
})
export class AgNewGroupComponent implements OnInit {
    @Input() private editingGroup: IGroup = null;

    @Output() private newGroup: EventEmitter<IGroup> = new EventEmitter<IGroup>();

    public groupName: FormControl = new FormControl('', Validators.required);

    constructor() {}

    public ngOnInit(): void {
        if (this.editingGroup) {
            this.groupName.setValue(this.editingGroup.name);
        }
    }

    public onBack(): void {
        this.newGroup.emit(null);
    }

    public onSave(): void {
        if (this.editingGroup) {
            this.editingGroup.name = this.groupName.value;
            this.newGroup.emit(null);
            return;
        }

        if (this.groupName.value) {
            const group: IGroup = {
                id: null,
                name: this.groupName.value,
                claims: [],
                users: [],
            };
            this.newGroup.emit(group);
            return;
        }

        this.groupName.markAsTouched();
    }
}
