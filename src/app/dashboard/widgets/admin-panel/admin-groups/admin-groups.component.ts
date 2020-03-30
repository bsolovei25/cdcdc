import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IButtonImgSrc, IGroup, IWorkspace, IGlobalClaim } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUser } from '../../../models/events-widget';
import { Subscription, combineLatest } from 'rxjs';

@Component({
    selector: 'evj-admin-groups',
    templateUrl: './admin-groups.component.html',
    styleUrls: ['./admin-groups.component.scss'],
})
export class AdminGroupsComponent implements OnInit, OnDestroy {
    // TODO
    @Output() private hideGroups: EventEmitter<void> = new EventEmitter<void>();

    public searchIcon: string = 'assets/icons/search-icon.svg';
    public plusIcon: IButtonImgSrc = {
        btnIconSrc: 'assets/icons/plus-icon.svg',
    };

    public allWorkers: IUser[] = [];
    public allWorkspaces: IWorkspace[] = [];

    public isCreateClaim: boolean = false;
    public isCreateNewGroup: boolean = false;

    public editingGroup: IGroup = null;

    public groups: IGroup[] = [];
    public newGroups: IGroup[] = [];
    public editedGroupsIds: number[] = [];
    public deletedGroupsIds: number[] = [];

    private searchingGroupString: string = '';
    private searchingWorkerString: string = '';

    public groupSelection: SelectionModel<IGroup> = new SelectionModel<IGroup>();
    public blockSelection: SelectionModel<void> = new SelectionModel<void>();

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            combineLatest([
                this.adminService.allWorkers$,
                this.adminService.getAllGroups(),
                this.adminService.getAllScreens(),
            ]).subscribe(([workers, groups, screens]) => {
                this.allWorkers = workers;

                this.groups = groups;
                this.groupSelection.select(this.groups[0]);
                this.onSelectGroup(this.groups[0]);

                this.allWorkspaces = screens;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    public onSearchGroup(event: string): void {
        this.searchingGroupString = event.toLowerCase();
    }

    public onSearchUser(event: string): void {
        this.searchingWorkerString = event.toLowerCase();
    }

    public displaySearchedWorker(worker: IUser): boolean {
        const fullName: string = `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
        return fullName.toLowerCase().includes(this.searchingWorkerString);
    }

    public displaySearchedGroup(group: IGroup): boolean {
        return group.name.toLowerCase().includes(this.searchingGroupString);
    }

    public defineIsUserInGroup(worker: IUser): boolean {
        const activeGroup: IGroup = this.groupSelection.selected[0];

        return activeGroup ? activeGroup.users.includes(worker.id) : false;
    }

    public onSelectGroup(group: IGroup): void {
        this.groupSelection.select(group);
        if (group) {
            group.users.forEach((userId) => {
                const index = this.allWorkers.findIndex((worker) => worker.id === userId);
                const [user] = this.allWorkers.splice(index, 1);
                this.allWorkers.unshift(user);
            });
        }
    }

    public onCreateNewGroup(group: IGroup): void {
        this.isCreateNewGroup = false;
        this.editingGroup = null;
        if (group) {
            this.newGroups.push(group);
            this.groupSelection.select(group);
        }
    }

    public onEditGroupName(group: IGroup): void {
        this.editingGroup = group;
        this.isCreateNewGroup = true;
        console.log(group);

        this.onEditGroup();
    }

    public onEditGroup(): void {
        const editedGroup = this.groupSelection.selected[0];
        if (editedGroup.id && !this.editedGroupsIds.includes(editedGroup.id)) {
            this.editedGroupsIds.push(editedGroup.id);
        }
    }

    public onDeleteGroup(): void {
        const deletedGroup = this.groupSelection.selected[0];
        console.log(deletedGroup);

        let index: number = null;
        if (deletedGroup.id) {
            this.deletedGroupsIds.push(deletedGroup.id);
            index = this.groups.findIndex((group) => group.id === deletedGroup.id);
        } else {
            index = this.newGroups.findIndex((group) => group.name === deletedGroup.name);
        }
        if (index !== -1) {
            this.groups.splice(index, 1);
            this.groupSelection.select(this.groups[0]);
        }
    }

    public editWorkerInGroup(addWorkerToGroup: boolean, worker: IUser): void {
        const currentGroup = this.groupSelection.selected[0];

        if (addWorkerToGroup) {
            currentGroup.users.push(worker.id);
        } else {
            const index = currentGroup.users.findIndex((item) => item === worker.id);
            currentGroup.users.splice(index, 1);
        }

        if (currentGroup.id) {
            this.onEditGroup();
        }
    }

    public onClickCreateNewClaim(): void {
        this.isCreateClaim = true;
    }

    public onCreateSpecialClaim(claim: IGlobalClaim): void {
        this.isCreateClaim = false;
    }

    public onReturn(): void {
        this.hideGroups.emit();
    }

    public async onSave(): Promise<void> {
        try {
            this.newGroups.forEach(
                async (item) => await this.adminService.createNewGroup(item).toPromise()
            );
            this.deletedGroupsIds.forEach(
                async (id) => await this.adminService.deleteGroupById(id).toPromise()
            );

            console.log('edited group: ', this.editedGroupsIds);

            this.editedGroupsIds.forEach(async (id) => {
                const group = this.groups.find((item) => item.id === id);
                console.log(group);

                if (group) {
                    await this.adminService.editGroup(group).toPromise();
                }
            });
        } catch (error) {
            console.error(error);
        }
        this.hideGroups.emit();
    }
}
