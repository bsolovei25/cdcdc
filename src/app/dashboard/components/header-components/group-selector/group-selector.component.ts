import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { UserSettingsService } from '../../../services/user-settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupSelectorDialogComponent } from './group-selector-dialog/group-selector-dialog.component';

export interface IGroupScreens {
    id: number;
    iconId: number;
    name: string;
    description?: string;
    isEnabled: boolean;
    userScreens?: {
        id: number;
        name: string;
    }[];
}

export interface IGroupScreensIcon {
    id: number;
    src: string;
}

@Component({
    selector: 'evj-group-selector',
    templateUrl: './group-selector.component.html',
    styleUrls: ['./group-selector.component.scss'],
})
export class GroupSelectorComponent implements OnInit, OnDestroy {
    public isDropdownShowing: boolean = false;

    public formControl: FormControl = new FormControl('');

    public groups: IGroupScreens[] = [];

    constructor(
        private userSettingsService: UserSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.asyncStart();
    }

    public ngOnDestroy(): void {}

    private async asyncStart(): Promise<void> {
        await this.userSettingsService.getGroups();
        this.userSettingsService.groupsList$.subscribe((item) => {
            this.groups = item;
        });
        this.selectFirstGroup();
    }

    public onMouseEnter(): void {
        this.isDropdownShowing = true;
    }

    public onMouseLeave(): void {
        this.isDropdownShowing = false;
    }

    public onSelect(group: IGroupScreens): void {
        const currentIcon = this.userSettingsService.iconsList$.getValue()?.find((icon) => icon.id === group.iconId);
        this.userSettingsService.groupIconSrc = currentIcon?.src ?? undefined;
        this.userSettingsService.groupIconId = currentIcon?.id ?? undefined;
        this.userSettingsService.groupId = group.id ?? undefined;
        this.userSettingsService.groupName = group.id ? group.name : undefined;
        this.router.navigate([], {
            queryParams: { userScreenGroupId: group.id ?? undefined },
            queryParamsHandling: 'merge',
        });
        this.userSettingsService.getScreens(group.id);
    }

    private selectFirstGroup(): void {
        const fn = (id: string) => {
            if (!id) {
                return;
            }
            const group = this.groups.find((item) => item.id === +id && item.isEnabled);
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

        if (!this.userSettingsService.groupName && this.groups?.length > 0) {
            this.onSelect(this.groups.find((item) => item.isEnabled));
        }
    }

    public getClaims(groupId: number): boolean {
        if (!groupId) {
            return false;
        }
        return true;
    }

    public openDialog(): void {
        this.dialog.open(GroupSelectorDialogComponent, { data: this.groups });
    }
}
