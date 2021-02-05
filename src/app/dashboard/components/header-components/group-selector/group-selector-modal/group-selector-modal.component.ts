import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IGroupScreens } from '../group-selector.component';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
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
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public groupId: number,
        public dialogRef: MatDialogRef<GroupSelectorModalComponent>
    ) {}

    ngOnInit(): void {}

    public async onDelete(): Promise<void> {
        if (!(await this.userSettingsService.deleteGroup(this.groupId))) {
            return;
        }
        this.snackBar.openSnackBar('Группа удалена');
        if (+this.selector.selected[0].id === +this.groupId) {
            this.selectFirstGroup();
        }
    }

    public selectFirstGroup(): void {
        const groups = this.userSettingsService.groupsList$.getValue();
        const fn = (id: string) => {
            if (!id) {
                return;
            }
            const group = groups.find((item) => item.id === +id);
            if (group) {
                this.onSelect(group);
            }
        };

        const groupIdFromRoute: string = this.route.snapshot.queryParamMap.get('userScreenGroupId');
        if (!!groupIdFromRoute) {
            fn(groupIdFromRoute);
        } else {
            const groupIdFromSS: string = sessionStorage.getItem('userScreenGroupId');
            const groupIdFromLS: string = localStorage.getItem('userScreenGroupId');
            !!groupIdFromSS ? fn(groupIdFromSS) : fn(groupIdFromLS);
        }

        if (!this.selector.selected.length && groups?.length > 0) {
            this.onSelect(groups[0]);
        }
    }

    public onSelect(group: IGroupScreens): void {
        this.selector.select(group);
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
