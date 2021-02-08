import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { IGroupScreens } from '../group-selector.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserSettingsService } from "../../../../services/user-settings.service";

@Component({
    selector: 'evj-group-selector-dialog',
    templateUrl: './group-selector-dialog.component.html',
    styleUrls: ['./group-selector-dialog.component.scss'],
})
export class GroupSelectorDialogComponent implements OnInit {
    @ViewChild('mainContent', { static: true }) mainContent: ElementRef;
    public isCreateNewGroup: boolean = false;
    public saveNewGroup: boolean = false;
    public newGroup: IGroupScreens;
    public groups: IGroupScreens[] = [];
    public saveIndicator: {
        flag: boolean,
        id: number
    } = {
        flag: false,
        id: 0
    };

    constructor(
        public dialogRef: MatDialogRef<GroupSelectorDialogComponent>,
        public userSettingsService: UserSettingsService
    ) {}

    ngOnInit(): void {
        this.userSettingsService.groupsList$.subscribe((item) => {
            this.groups = item;
        });
    }

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
            iconId: null
        };
        this.isCreateNewGroup = true;
        this.mainContent.nativeElement.scrollTop = 0;
    }

    public saveNewProject(): void {
        this.saveNewGroup = true;
        this.saveIndicator = {flag: this.saveNewGroup, id: 0};
    }
}
