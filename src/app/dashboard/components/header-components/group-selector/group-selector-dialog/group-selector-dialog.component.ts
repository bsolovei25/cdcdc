import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserSettingsService } from '../../../../services/user-settings.service';

@Component({
    selector: 'evj-group-selector-dialog',
    templateUrl: './group-selector-dialog.component.html',
    styleUrls: ['./group-selector-dialog.component.scss'],
})
export class GroupSelectorDialogComponent implements OnInit {
    @ViewChild('mainContent', { static: true }) mainContent: ElementRef;
    readonly newGroup: IGroupScreens = {
        id: null,
        name: '',
        isEnabled: true,
        iconId: null,
    };
    public groups: IGroupScreens[] = [];

    constructor(
        public dialogRef: MatDialogRef<GroupSelectorDialogComponent>,
        public userSettingsService: UserSettingsService
    ) {}

    ngOnInit(): void {
        this.userSettingsService.groupsList$.subscribe((item) => {
            this.groups = item.filter((group) => !!group.id);
        });
    }

    public closeDialog(): void {
        this.dialogRef.close();
        this.onCancelNewProject();
    }

    public addNewProject(): void {
        this.onCancelNewProject();
        this.groups.unshift({ ...this.newGroup });
    }

    public onCancelNewProject(): void {
        this.groups = this.groups.filter((group) => !!group.id);
    }
}
