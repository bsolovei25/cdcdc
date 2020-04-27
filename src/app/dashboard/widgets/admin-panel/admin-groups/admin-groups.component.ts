import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IButtonImgSrc, IGroup, IWorkspace, IGlobalClaim } from '../../../models/admin-panel';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { IUser, IUnitEvents } from '../../../models/events-widget';
import { Subscription, combineLatest } from 'rxjs';
import { IWidgets } from '../../../models/widget.model';
import { SnackBarService } from '../../../services/snack-bar.service';

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

    public isDataLoading: boolean = false;

    public allWorkers: IUser[] = [];
    public allWorkspaces: IWorkspace[] = [];

    public isCreateClaim: boolean = false;
    public isCreateNewGroup: boolean = false;
    public isAlertShowing: boolean = false;
    public isSaveClicked: boolean = false;

    public groups: IGroup[] = [];
    public newGroups: IGroup[] = [];
    public editedGroupsIds: number[] = [];
    public deletedGroupsIds: number[] = [];

    public currentGroupGeneralClaims: IGlobalClaim[] = [];
    public currentGroupSpecialClaims: IGlobalClaim[] = [];

    public editingGroup: IGroup = null;

    public generalClaims: IGlobalClaim[] = [];
    public specialClaims: IGlobalClaim[] = [];

    private searchingGroupString: string = '';
    private searchingWorkerString: string = '';

    public groupSelection: SelectionModel<IGroup> = new SelectionModel<IGroup>();
    public blockSelection: SelectionModel<void> = new SelectionModel<void>();
    public claimsSelector: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();

    public groupWorkspaces: IWorkspace[] = [];

    private subscriptions: Subscription[] = [];
    private subs: Subscription = null;

    constructor(
        private adminService: AdminPanelService,
        private materialController: SnackBarService
    ) {}

    public ngOnInit(): void {
        this.isDataLoading = true;
        this.subscriptions.push(
            combineLatest([
                this.adminService.allWorkers$,
                this.adminService.getAllGroups(),
                this.adminService.getAllScreens(),
            ]).subscribe(
                ([workers, groups, screens]) => {
                    this.allWorkers = workers.slice();

                    this.groups = groups;
                    this.onSelectGroup(this.groups[0]);

                    this.allWorkspaces = screens;
                },
                console.log,
                () => (this.isDataLoading = false)
            )
        );
        this.generalClaims = this.adminService.generalClaims;
        this.specialClaims = this.adminService.specialClaims;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
        if (this.subs) {
            this.subs.unsubscribe();
        }
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

    public defineIsClaimInGroup(claim: IGlobalClaim): boolean {
        const currentGroup = this.groupSelection.selected[0];
        return currentGroup
            ? !!currentGroup.claims.find((item) => item.claimType === claim.claimType)
            : false;
    }

    public onClickToGeneralClaim(claim: IGlobalClaim): void {
        const currentGroupClaims = this.groupSelection.selected[0].claims;
        const index = currentGroupClaims.findIndex((item) => item.claimType === claim.claimType);
        if (index === -1) {
            currentGroupClaims.push(claim);
        } else {
            currentGroupClaims.splice(index, 1);
        }
        this.onEditGroup();
    }

    public canShowSpecialClaim(claim: IGlobalClaim): boolean {
        const currentGroup = this.groupSelection.selected[0];
        return currentGroup
            ? !!currentGroup.claims.find(
                  (item) => item.claimType === claim.claimType && claim.claimValueType !== 'screen'
              )
            : false;
    }

    public onSelectSpecialClaim(claim: IGlobalClaim): void {
        if (this.claimsSelector.isSelected(claim)) {
            this.claimsSelector.clear();
        } else {
            this.claimsSelector.select(claim);
        }
    }

    public allEntitiesInSpecialType(claim: IGlobalClaim): IGlobalClaim[] {
        const currentGroup = this.groupSelection.selected[0];
        return currentGroup
            ? currentGroup.claims.filter((item) => item.claimType === claim.claimType)
            : [];
    }

    public findEntityByClaimValue(claim: IGlobalClaim): string {
        let entity: IUnitEvents | IWidgets;
        switch (claim.claimValueType) {
            case 'unit':
                entity = this.adminService.units.find((item) => item.id === +claim.value);
                return entity ? entity.name : '';
            case 'widget':
                entity = this.adminService.allWidgets.find((item) => item.id === claim.value);
                return entity ? entity.title : '';
        }
    }

    public onRemoveSpecialClaim(claim: IGlobalClaim): void {
        const currentGroup = this.groupSelection.selected[0];
        const index: number = currentGroup.claims.findIndex(
            (item) => item.claimType === claim.claimType
        );
        currentGroup.claims.splice(index, 1);
        this.onEditGroup();
    }

    public onWorkerScreens(): IWorkspace[] {
        const workspaces = this.groupSelection.selected[0].workspaces;
        return workspaces ? workspaces : [];
    }

    public onSelectGroup(group: IGroup): void {
        this.groupSelection.select(group);
        this.blockSelection.clear();

        if (group) {
            group.users.forEach((userId) => {
                const index = this.allWorkers.findIndex((worker) => worker.id === userId);
                const [user] = this.allWorkers.splice(index, 1);
                this.allWorkers.unshift(user);
            });

            this.currentGroupGeneralClaims = group.claims.filter((claim) => !claim.value);
            this.currentGroupSpecialClaims = group.claims.filter((claim) => !!claim.value);

            if (!group.workspaces) {
                if (this.subs) {
                    this.subs.unsubscribe();
                }

                this.isDataLoading = false;

                this.subs = this.adminService.getAllGroupScreenClaims(group.id).subscribe(
                    (data) => {
                        group.workspaces = data.data;
                        this.groupWorkspaces = group.workspaces;
                    },
                    console.log,
                    () => (this.isDataLoading = false)
                );
                this.groupWorkspaces = [];
            } else {
                this.groupWorkspaces = group.workspaces;
            }
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
        let isClaimExists: boolean = false;

        if (claim) {
            isClaimExists = !!this.groupSelection.selected[0].claims.find(
                (item) => item.claimType === claim.claimType && item.value === claim.value
            );
        }

        if (claim && !isClaimExists) {
            const currentGroup = this.groupSelection.selected[0];
            currentGroup.claims.push(claim);
            this.onEditGroup();
        }

        if (isClaimExists) {
            this.materialController.openSnackBar(
                'Такое специальное право уже существует',
                'snackbar-red'
            );
            return;
        }

        this.isCreateClaim = false;
    }

    public onClickButton(isSaveClicked: boolean = false): void {
        this.isSaveClicked = isSaveClicked;
        this.isAlertShowing = true;
    }

    public onClickAlert(event: boolean): void {
        this.isAlertShowing = false;
        if (event && this.isSaveClicked) {
            this.onSave();
        } else if (event && !this.isSaveClicked) {
            this.onReturn();
        }
    }

    public onChangeWorkspaces(): void {
        this.onEditGroup();
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
            this.editedGroupsIds.forEach(async (id) => {
                const group = this.groups.find((item) => item.id === id);
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
