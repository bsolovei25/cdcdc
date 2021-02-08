import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IGroupScreens } from '../group-selector.component';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'evj-group-selector-modal',
    templateUrl: './group-selector-modal.component.html',
    styleUrls: ['./group-selector-modal.component.scss'],
})
export class GroupSelectorModalComponent implements OnInit {
    public selector: SelectionModel<IGroupScreens> = new SelectionModel<IGroupScreens>();

    constructor(
        private userSettingsService: UserSettingsService,
        private snackBar: SnackBarService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public groupId: number,
        public dialogRef: MatDialogRef<GroupSelectorModalComponent>
    ) {}

    ngOnInit(): void {}

    public async onDelete(): Promise<void> {
        if (!(await this.userSettingsService.deleteGroup(this.groupId))) {
            return;
        }
        this.snackBar.openSnackBar('Группа удалена');
        if (this.userSettingsService.groupId === this.groupId) {
            const selectableGroup = this.userSettingsService.groupsList$.getValue().find(item => item.isEnabled);
            this.onSelect(selectableGroup);
        }
    }

    public onSelect(group: IGroupScreens): void {
        const currentIcon = this.userSettingsService.iconsList$.getValue()?.find((icon) => icon === group.iconId);
        this.userSettingsService.groupIconId = currentIcon ?? undefined;
        this.userSettingsService.groupId = group.id ?? undefined;
        this.userSettingsService.groupName = group.id ? group.name : undefined;
        this.router.navigate([], {
            queryParams: { userScreenGroupId: group.id ?? undefined },
            queryParamsHandling: 'merge',
        });
        this.userSettingsService.getScreens(group.id);
    }

    public closeModal(): void {
        this.dialogRef.close();
    }

    public answer(data: boolean): void {
        if (data) {
            this.onDelete();
        }
        this.closeModal();
    }
}
