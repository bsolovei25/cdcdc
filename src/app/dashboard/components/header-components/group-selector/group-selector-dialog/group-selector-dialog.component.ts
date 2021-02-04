import { Component, Inject, OnInit } from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-group-selector-dialog',
    templateUrl: './group-selector-dialog.component.html',
    styleUrls: ['./group-selector-dialog.component.scss'],
})
export class GroupSelectorDialogComponent implements OnInit {
    isCreateNewGroup: boolean = false;
    saveNewGroup: boolean = false;
    newGroup: IGroupScreens;
    constructor(
        @Inject(MAT_DIALOG_DATA) public groups: IGroupScreens[] = [],
        public dialogRef: MatDialogRef<GroupSelectorDialogComponent>
    ) {}
    ngOnInit(): void {}

    public onChanged(value: boolean): void {
        this.isCreateNewGroup = value;
    }

    private closeDialog(): void {
        this.dialogRef.close();
    }

    private addNewProject(): void {
        this.newGroup = {
            id: 0,
            name: '',
            isEnabled: true,
        };
        this.isCreateNewGroup = true;
    }

    private saveNewProject(): void {
        this.saveNewGroup = true;
    }
}
