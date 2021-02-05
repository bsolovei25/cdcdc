import { Component, Inject, OnInit } from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-group-selector-dialog',
    templateUrl: './group-selector-dialog.component.html',
    styleUrls: ['./group-selector-dialog.component.scss'],
})
export class GroupSelectorDialogComponent implements OnInit {
    public isCreateNewGroup: boolean = false;
    public saveNewGroup: boolean = false;
    public newGroup: IGroupScreens;
    constructor(
        @Inject(MAT_DIALOG_DATA) public groups: IGroupScreens[] = [],
        public dialogRef: MatDialogRef<GroupSelectorDialogComponent>
    ) {}
    ngOnInit(): void {}

    public onChanged(value: boolean): void {
        this.isCreateNewGroup = value;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    public addNewProject(): void {
        this.newGroup = {
            id: 0,
            name: '',
            isEnabled: true,
        };
        this.isCreateNewGroup = true;
    }

    public saveNewProject(): void {
        this.saveNewGroup = true;
    }
}
