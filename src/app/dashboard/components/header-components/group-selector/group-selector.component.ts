import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { UserSettingsService } from '../../../services/user-settings.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface IGroupScreens {
    id: number;
    name: string;
    description?: string;
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

    public groups: IGroupScreens[] = [];

    public selector: SelectionModel<IGroupScreens> = new SelectionModel<IGroupScreens>();

    constructor(
        private userSettingsService: UserSettingsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.asyncStart();
    }

    public ngOnDestroy(): void {}

    private async asyncStart(): Promise<void> {
        this.groups = await this.getGroups();
        this.selectFirstGroup();
    }

    public onMouseEnter(): void {
        this.isDropdownShowing = true;
    }

    public onMouseLeave(): void {
        this.isDropdownShowing = false;
    }

    public onSelect(group: IGroupScreens): void {
        this.selector.select(group);
        this.userSettingsService.groupId = group.id ?? undefined;
        this.userSettingsService.groupName = group.id ? group.name : undefined;
        this.router.navigate([], {
            queryParams: { userScreenGroupId: group.id ?? undefined },
            queryParamsHandling: 'merge',
        });
        this.userSettingsService.GetScreens(group.id);
    }

    public async onDelete(group: IGroupScreens): Promise<void> {
        if (!group) {
            return;
        }
        if (!(await this.userSettingsService.DeleteGroup(group.id))) {
            return;
        }
        if (this.selector.selected[0] === group) {
            this.selectFirstGroup();
        }
        const idx = this.groups.findIndex((item) => item === group);
        this.groups.splice(idx, 1);
    }

    public async onEdit(group: IGroupScreens, event: string): Promise<void> {
        if (!(event?.length > 0)) {
            return;
        }
        group.name = event;
        group = await this.userSettingsService.UpdateGroup(group);
    }

    public async onCreateGroup(): Promise<void> {
        if (!!this.formControl.value) {
            const newGroup = await this.userSettingsService.AddGroup({
                id: 0,
                name: this.formControl.value.slice(),
            });
            if (!newGroup) {
                return;
            }
            this.groups.push(newGroup);
            this.onSelect(newGroup);
            await this.userSettingsService.PushScreen(`Экран группы ${newGroup.name}`);
            this.formControl.setValue('');
        }
    }

    public getClaims(groupId: number): boolean {
        if (!groupId) {
            return false;
        }
        return true;
    }

    private selectFirstGroup(): void {
        const fn = (id: string) => {
            if (!id) {
                return;
            }
            const group = this.groups.find((item) => item.id === +id);
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

        if (!this.selector.selected.length && this.groups?.length > 0) {
            this.onSelect(this.groups[0]);
        }
    }

    private async getGroups(): Promise<IGroupScreens[]> {
        const groups = await this.userSettingsService.GetGroups();
        return groups;
    }
}
