import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IButtonImgSrc, IGroup, IWorkspace, IGlobalClaim } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUser } from '../../../models/events-widget';
import { Subscription } from 'rxjs';

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
    public isCreateNewGroup: boolean = true;

    public groups: IGroup[] = [];
    public newGroups: IGroup[] = [];
    public editedGroupsIds: number[] = [];
    public deletedGroupsIds: number[] = [];

    public groupSelection: SelectionModel<IGroup> = new SelectionModel<IGroup>();
    public blockSelection: SelectionModel<void> = new SelectionModel<void>();

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.allWorkers$.subscribe(
                (workers: IUser[]) => (this.allWorkers = workers)
            ),
            this.adminService
                .getAllScreens()
                .subscribe((screens: IWorkspace[]) => (this.allWorkspaces = screens)),
            this.adminService.getAllGroups().subscribe((groups) => {
                this.groups = groups;
                this.groupSelection.select(this.groups[0]);
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    public onSearchGroup(event: string): void {
        console.log(event);
    }

    public onSearchUser(event: string): void {
        console.log(event);
    }

    public onCreateNewGroup(group: IGroup): void {
        this.isCreateNewGroup = false;
        if (group) {
            this.newGroups.push(group);
        }
    }

    public onEditGroup(): void {
        const editedGroup = this.groupSelection.selected[0];
        if (editedGroup.id && !this.editedGroupsIds.includes(editedGroup.id)) {
            this.editedGroupsIds.push(editedGroup.id);
        }
    }

    public onDeleteGroup(): void {
        const deletedGroup = this.groupSelection.selected[0];
        let index: number = null;
        if (deletedGroup.id) {
            this.deletedGroupsIds.push(deletedGroup.id);
            index = this.groups.findIndex((group) => group.id === deletedGroup.id);
        } else {
            index = this.newGroups.findIndex((group) => group.name === deletedGroup.name);
        }
        if (index) {
            this.groups.splice(index, 1);
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

    public onSave(): void {
        this.hideGroups.emit();
    }
}
