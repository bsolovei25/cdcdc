import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
    IButtonImgSrc,
    IWorkspace,
    IGroup,
    IGlobalClaim,
} from '../../../../../dashboard/models/ADMIN/admin-panel';
import { IUser, IUnitEvents } from '../../../../../dashboard/models/EVJ/events-widget';
import { IInputOptions } from '../../../../../@shared/models/input.model';
import { SelectionModel } from '@angular/cdk/collections';
import { IAlertWindowModel } from '../../../../../@shared/models/alert-window.model';
import { Subscription, combineLatest } from 'rxjs';
import { AdminPanelService } from '../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';
import { SnackBarService } from '../../../../../dashboard/services/snack-bar.service';
import { IWidget } from '../../../../../dashboard/models/widget.model';
import { FormControl, Validators } from '@angular/forms';

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
    public isDataChanged: boolean = false;

    public allWorkers: IUser[] = [];
    public allWorkspaces: IWorkspace[] = [];

    public isCreateClaim: boolean = false;

    public groups: IGroup[] = [];
    public newGroups: IGroup[] = [];
    public editedGroupsIds: number[] = [];
    public deletedGroupsIds: number[] = [];

    public currentGroupGeneralClaims: IGlobalClaim[] = [];
    public currentGroupSpecialClaims: IGlobalClaim[] = [];

    public generalClaims: IGlobalClaim[] = [];
    public specialClaims: IGlobalClaim[] = [];

    //#region SEARCH_INPUT

    public inputGroupOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите наименование группы',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false,
        },
    };

    public searchingGroupString: string = '';

    public inputWorkerOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите ФИО сотрудника',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false,
        },
    };

    public searchingWorkerString: string = '';
    //#endregion

    public groupSelection: SelectionModel<IGroup> = new SelectionModel<IGroup>();
    public blockSelection: SelectionModel<void> = new SelectionModel<void>();
    public claimsSelector: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();

    public groupWorkspaces: IWorkspace[] = [];

    public alert: IAlertWindowModel = {
        isShow: false,
        questionText: '',
        acceptText: '',
        cancelText: 'Вернуться',
        acceptFunction: () => null,
        cancelFunction: () => null,
        closeFunction: () => (this.alert.isShow = false),
    };

    private subscriptions: Subscription[] = [];
    private subs: Subscription = null;

    constructor(private adminService: AdminPanelService, private snackBar: SnackBarService) {}

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

    public displaySearchedWorker(worker: IUser): boolean {
        const fullName: string = `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
        return fullName.toLowerCase().includes(this.searchingWorkerString.toLowerCase());
    }

    public displaySearchedGroup(group: IGroup): boolean {
        return group.name.toLowerCase().includes(this.searchingGroupString.toLowerCase());
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
        this.isDataChanged = true;
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

    public getSelectedSpecialClaims(claim: IGlobalClaim): IGlobalClaim[] {
        const currentGroup = this.groupSelection.selected[0];
        return currentGroup
            ? currentGroup.claims.filter((item) => item.claimType === claim.claimType)
            : [];
    }

    public getClaimTitleByValue(claim: IGlobalClaim): string {
        switch (claim.claimValueType) {
            case 'widget':
                return (
                    this.adminService.allWidgets.find((item) => item.id === claim.value)?.title ??
                    ''
                );
            case 'unit':
                return this.adminService.units.find((item) => item.id === +claim.value)?.name ?? '';
            case 'notificationCategory':
                return (
                    this.adminService.eventsCategories.find((item) => item.name === claim.value)
                        ?.description ?? ''
                );
            default:
                return '';
        }
    }

    public onRemoveSpecialClaim(claim: IGlobalClaim): void {
        const currentGroup = this.groupSelection.selected[0];
        const index: number = currentGroup.claims.findIndex((item) => item === claim);
        currentGroup.claims.splice(index, 1);
        this.onEditGroup();
        this.isDataChanged = true;
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

            if (!group.workspaces && group.id) {
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
            } else if (!group.workspaces) {
                this.groupWorkspaces = [];
            } else {
                this.groupWorkspaces = group?.workspaces;
            }
        }
    }

    public onEditGroup(): void {
        const editedGroup = this.groupSelection.selected[0];
        if (editedGroup.id && !this.editedGroupsIds.includes(editedGroup.id)) {
            this.editedGroupsIds.push(editedGroup.id);
            this.isDataChanged = true;
        }
    }

    public onClickDeleteGroup(): void {
        this.alert.questionText = `Вы действительно хотите удалить группу
        ${this.groupSelection.selected[0].name}`;
        this.alert.acceptText = 'Подтвердить';
        this.alert.cancelText = 'Вернуться';
        this.alert.acceptFunction = this.onDeleteGroup.bind(this);
        delete this.alert.input;
        this.alert.isShow = true;
    }

    private onDeleteGroup(): void {
        const deletedGroup = this.groupSelection.selected[0];
        if (deletedGroup.id) {
            this.deletedGroupsIds.push(deletedGroup.id);
            const index = this.groups.findIndex((group) => group.id === deletedGroup.id);
            if (index !== -1) {
                this.groups.splice(index, 1);
            }
        } else {
            const index = this.newGroups.findIndex((group) => group.name === deletedGroup.name);
            if (index !== -1) {
                this.newGroups.splice(index, 1);
            }
        }
        this.groupSelection.select(this.groups[0]);
        this.isDataChanged = true;
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

        this.isDataChanged = true;
    }

    public onClickCreateNewClaim(): void {
        this.isCreateClaim = true;
    }

    public onCreateSpecialClaim(claims: IGlobalClaim[]): void {
        if (claims) {
            const currentGroup = this.groupSelection.selected[0];

            claims.forEach((claim) => {
                const findClaim: boolean = !!currentGroup.claims.find(
                    (item) => item.claimType === claim.claimType && item.value === claim.value
                );

                if (findClaim) {
                    return;
                }

                currentGroup.claims.push(claim);
                this.onEditGroup();
            });
            this.isDataChanged = true;
        }

        this.isCreateClaim = false;
    }

    public onClickButton(isSaveClicked: boolean = false): void {
        if (isSaveClicked && this.isDataChanged) {
            this.alert.questionText = 'Сохранить внесенные изменения?';
            this.alert.acceptText = 'Сохранить';
            this.alert.cancelText = 'Отменить';
            this.alert.acceptFunction = this.onSave.bind(this);
        } else if (this.isDataChanged) {
            this.alert.questionText = `Вы действительно хотите вернуться?
                Все внесенные изменения будут утрачены!`;
            this.alert.acceptText = 'Подтвердить';
            this.alert.cancelText = 'Вернуться';
            this.alert.acceptFunction = this.onReturn.bind(this);
        } else {
            this.onReturn();
        }
        delete this.alert.input;
        this.alert.isShow = true;
    }

    public onChangeGroupName(group?: IGroup): void {
        let questionText: string = '';
        let inputValue: string = '';
        let acceptFn: () => void = null;

        if (group) {
            questionText = 'Введите новое название группы';
            inputValue = group.name;
            acceptFn = () => {
                group.name = this.alert.input.formControl.value;
                this.onEditGroup();
            };
        } else {
            questionText = 'Введите название новой группы пользователей';
            acceptFn = () => {
                const newGroup: IGroup = {
                    id: null,
                    name: this.alert.input.formControl.value,
                    claims: [],
                    users: [],
                };
                this.newGroups.push(newGroup);
                this.groupSelection.select(newGroup);
                this.isDataChanged = true;
            };
        }

        this.alert.questionText = questionText;
        this.alert.acceptText = 'Сохранить';
        this.alert.cancelText = 'Отменить';
        this.alert.input = {
            formControl: new FormControl(inputValue, Validators.required),
            placeholder: 'Введите информацию',
        };
        this.alert.acceptFunction = () => {
            if (this.alert.input.formControl.value) {
                acceptFn();
            } else {
                this.alert.input.formControl.markAsTouched();
                throw new Error('Empty field');
            }
        };
        this.alert.isShow = true;
    }

    public onChangeWorkspaces(): void {
        this.onEditGroup();
    }

    public onReturn(): void {
        this.hideGroups.emit();
    }

    public async onSave(): Promise<void> {
        try {
            this.isDataLoading = true;
            const promises: Promise<void>[] = [];
            this.newGroups.forEach((item) =>
                promises.push(this.adminService.createNewGroup(item).toPromise())
            );
            this.deletedGroupsIds.forEach((id) =>
                promises.push(this.adminService.deleteGroupById(id).toPromise())
            );
            this.editedGroupsIds.forEach(async (id) => {
                const group = this.groups.find((item) => item.id === id);
                if (group) {
                    promises.push(this.adminService.editGroup(group).toPromise());
                }
            });
            this.newGroups = [];
            this.deletedGroupsIds = [];
            this.editedGroupsIds = [];

            await Promise.all(promises);

            const groups = await this.adminService.getAllGroups().toPromise();
            this.groups = groups;
            this.onSelectGroup(this.groups[0]);

            const screens = await this.adminService.getAllScreens().toPromise();
            this.allWorkspaces = screens;

            this.isDataChanged = false;
            this.snackBar.openSnackBar('Данные сохранены', 'blue');
        } catch (error) {
            console.error(error);
        } finally {
            this.isDataLoading = false;
        }
    }
}
