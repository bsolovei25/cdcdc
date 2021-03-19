import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserSettingsService } from '../../../services/user-settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupSelectorDialogComponent } from './group-selector-dialog/group-selector-dialog.component';
import { ClaimService } from "../../../services/claim.service";

export interface IGroupScreens {
    id: number;
    iconId: string;
    name: string;
    description?: string;
    isEnabled: boolean;
    userScreens?: {
        id: number;
        name: string;
    }[];
}

@Component({
    selector: 'evj-group-selector',
    templateUrl: './group-selector.component.html',
    styleUrls: ['./group-selector.component.scss'],
})
export class GroupSelectorComponent implements OnInit, OnDestroy {
    public isDropdownShowing: boolean = false;

    public formControl: FormControl = new FormControl('');

    readonly baseSrc: string = `${this.userSettingsService.getRestUrl()}/api/file-storage/`;

    public groups: IGroupScreens[] = [];

    constructor(
        public userSettingsService: UserSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private claimService: ClaimService
    ) {}

    public ngOnInit(): void {
        this.asyncStart();
    }

    public ngOnDestroy(): void {}

    private async asyncStart(): Promise<void> {
        await this.userSettingsService.getIcons();
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
        this.userSettingsService.groupIconId = group.iconId ?? undefined;
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
        return !!groupId;
    }

    public isProjectManagementAvailable(): boolean {
        return this.claimService.claimScreens$.getValue().some((value) => value === 'add');
    }

    public openDialog(): void {
        this.dialog.open(GroupSelectorDialogComponent, { data: this.groups });
    }
}
