import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IWorkerOptionAdminPanel, IWorkspace, IScreen, IClaim } from '../../../models/admin-panel';
import { IUser } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';
import { IBrigade } from '../../../models/shift.model';
import { MaterialControllerService } from '../../../services/material-controller.service';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss'],
})
export class AdminWorkerSettingsComponent implements OnInit, OnDestroy {
    @Input() public isCreateNewUser: boolean = false;
    @Output() public closeWorkerSettings: EventEmitter<IUser> = new EventEmitter<IUser>();

    public isClaimsShowing: boolean = true;
    public isAlertShowing: boolean = false;

    public isCheckBoxClicked: boolean = false;

    public isWorkerResponsible: boolean = false;

    private searchingWorkspaceValue: string = '';
    private searchingFieldName: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public options: IWorkerOptionAdminPanel[];

    public worker: IUser = null;

    public allWorkspaces: IWorkspace[] = [];
    public workerScreens: IWorkspace[] = [];
    public workerScreensDetached: IScreen[] = [];
    private workspacesClaims: { workspaceId: number; claims: IClaim[] }[] = [];

    private subscriptions: Subscription[] = [];

    constructor(
        private adminService: AdminPanelService,
        private materialController: MaterialControllerService
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe((worker: IUser) => {
                this.worker = fillDataShape(worker);
                this.options = [
                    {
                        name: 'Логин',
                        value: this.worker.login,
                        key: 'login',
                    },
                    {
                        name: 'ФИО',
                        value: this.adminService.getFullName(this.worker),
                        key: 'name',
                    },
                    {
                        name: 'Должность',
                        value: this.worker.positionDescription,
                        key: 'positionDescription',
                    },
                    {
                        name: 'Телефон',
                        value: this.worker.phone,
                        key: 'phone',
                    },
                    {
                        name: 'Почта',
                        value: this.worker.email,
                        key: 'email',
                    },
                    {
                        name: 'Установка',
                        value: '',
                        key: 'unit',
                    },
                    {
                        name: 'Бригада',
                        value: this.worker.hasOwnProperty('brigade')
                            ? this.worker.brigade.number
                            : null,
                        key: 'brigade',
                    },
                ];
            }),
            this.adminService.activeWorkerScreens$.subscribe((workerScreens: IScreen[]) => {
                workerScreens.forEach((item: IScreen) => {
                    this.workerScreens.push(item.screen);
                });
                this.workerScreensDetached = workerScreens;
            }),
            this.adminService.getAllScreens().subscribe((data: IWorkspace[]) => {
                this.allWorkspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    //#region SEARCH

    public onSearchWorkspace(searchedWorkspace: string): void {
        this.searchingWorkspaceValue = searchedWorkspace.toLowerCase();
    }

    public onSearchField(searchedField: string): void {
        this.searchingFieldName = searchedField.toLowerCase();
    }

    public isValidFieldName(fieldName: string): boolean {
        return fieldName.toLowerCase().includes(this.searchingFieldName);
    }

    public isValidWorkspaceName(workspaceName: string): boolean {
        return workspaceName.toLowerCase().includes(this.searchingWorkspaceValue);
    }

    //#endregion

    public defineIsWorkspaceActive(workspace: IWorkspace): boolean {
        return !!this.workerScreens.find((item: IWorkspace) => item.id === workspace.id);
    }

    public defineWorkerScreenId(workspace: IWorkspace): number {
        const screen = this.workerScreensDetached.find(
            (item: IScreen) => item.screen.id === workspace.id
        );
        if (screen) {
            return screen.id;
        }
        return null;
    }

    public onSelectWorkspace(event: IWorkspace): void {
        this.isCheckBoxClicked = false;
        this.isAlertShowing = true;
        if (!this.defineIsWorkspaceActive(event)) {
            this.workerScreens.push(event);
        } else {
            const index: number = this.workerScreens.findIndex(
                (item: IWorkspace) => item.id === event.id
            );
            this.workerScreens.splice(index, 1);
        }
    }

    public onSelectWorkspaceClaims(event: { workspaceId: number; claims: IClaim[] }): void {
        console.log(event);
        const index: number = this.workspacesClaims.findIndex(
            (item) => item.workspaceId === event.workspaceId
        );
        if (index === -1) {
            this.workspacesClaims.push(event);
        } else {
            this.workspacesClaims.splice(index, 1);
            this.workspacesClaims.push(event);
        }
    }

    private addWorkspacesToWorker(): number[] {
        const idArray: number[] = [];
        this.workerScreens.forEach((item: IWorkspace) => {
            const addingFlag: boolean = !!this.workerScreensDetached.find(
                (wsd: IScreen) => wsd.screen.id === item.id
            );
            if (!addingFlag) {
                idArray.push(item.id);
            }
        });
        return idArray;
    }

    private removeWorkspacesFromWorker(): number[] {
        const idArray: number[] = [];
        this.workerScreensDetached.forEach((item: IScreen) => {
            const addingFlag: boolean = !!this.workerScreens.find(
                (wsd: IWorkspace) => wsd.id === item.screen.id
            );
            if (!addingFlag) {
                idArray.push(item.id);
            }
        });
        return idArray;
    }

    public onSelectBrigade(brigade: IBrigade): void {
        this.isCheckBoxClicked = false;
        this.isAlertShowing = true;

        if (brigade) {
            this.worker.brigade = { id: brigade.id, number: brigade.number.toString() };
            return;
        }

        if (this.worker.hasOwnProperty('brigade')) {
            delete this.worker.brigade;
        }
    }

    public onSetResponsible(event: boolean): void {
        this.isWorkerResponsible = event;
        this.isAlertShowing = true;
    }

    public onSelectClaim(): void {
        this.isCheckBoxClicked = false;
        this.isAlertShowing = true;
    }

    public onFieldChanging(event: IWorkerOptionAdminPanel): void {
        if (event.key === 'name') {
            const nameArray: string[] = event.value.split(' ');
            if (nameArray.length > 3) {
                console.error('INVALID WORKER NAME');
            } else {
                this.worker.lastName = nameArray[0] ? nameArray[0] : '';
                this.worker.firstName = nameArray[1] ? nameArray[1] : '';
                this.worker.middleName = nameArray[2] ? nameArray[2] : '';
            }
        } else {
            this.worker[event.key] = event.value;
        }
        this.isCheckBoxClicked = false;
        this.isAlertShowing = true;
    }

    public returnPhotoPath(): string {
        return this.adminService.getPhotoLink(this.worker);
    }

    private async onCreateNewWorker(): Promise<void> {
        this.worker = await this.adminService.createNewWorker(this.worker).toPromise();
        const promises: Promise<void>[] = [];
        this.addWorkspacesToWorker().forEach((index: number) => {
            const workspaceClaims = this.workspacesClaims.find(
                (item) => item.workspaceId === index
            );

            promises.push(
                this.adminService
                    .addWorkerScreen(this.worker.id, index, workspaceClaims.claims)
                    .toPromise()
            );
        });
        Promise.all(promises);
    }

    private async onEditWorker(): Promise<void> {
        const promises: Promise<void>[] = [];
        promises.push(this.adminService.editWorkerData(this.worker).toPromise());
        this.addWorkspacesToWorker().forEach((index: number) => {
            const workspaceClaims = this.workspacesClaims.find(
                (item) => item.workspaceId === index
            );

            promises.push(
                this.adminService
                    .addWorkerScreen(this.worker.id, index, workspaceClaims.claims)
                    .toPromise()
            );
        });
        this.removeWorkspacesFromWorker().forEach((index: number) => {
            promises.push(this.adminService.removeWorkerScreen(index).toPromise());
        });

        await Promise.all(promises);
    }

    private checkForRequiredFields(): boolean {
        const messages = {
            firstName: 'Имя',
            lastName: 'Фамилия',
            login: 'Логин',
            phone: 'Телефон',
            email: 'Эл.почта',
        };

        let snackbarMessage: string = '';

        for (const key in messages) {
            if (!this.worker[key]) {
                snackbarMessage = `${snackbarMessage} ${messages[key]}`;
            }
        }

        if (snackbarMessage) {
            this.materialController.openSnackBar(
                `Обязательные поля: ${snackbarMessage}`,
                'snackbar-red'
            );
        }

        return (
            !!this.worker.firstName &&
            !!this.worker.lastName &&
            !!this.worker.login &&
            !!this.worker.phone &&
            !!this.worker.email
        );
    }

    public onReturn(): void {
        this.closeWorkerSettings.emit(null);
    }

    public async onSave(): Promise<void> {
        if (this.isCheckBoxClicked && this.checkForRequiredFields()) {
            try {
                this.worker.displayName = this.adminService.generateDisplayName(this.worker);
                this.isCreateNewUser ? await this.onCreateNewWorker() : await this.onEditWorker();
                if (this.isWorkerResponsible) {
                    await this.adminService.setUserResponsible(this.worker.id).toPromise();
                }
                await this.adminService.updateAllWorkers();
                await this.adminService.updateAllBrigades();
                const userScreens: IScreen[] = await this.adminService
                    .getWorkerScreens(this.worker.id)
                    .toPromise();
                if (this.worker.hasOwnProperty('brigade')) {
                    const newActiveBrigade = this.adminService.brigades.find(
                        (brigade) => brigade.brigadeId === this.worker.brigade.id
                    );
                    this.adminService.activeBrigade$.next(newActiveBrigade);
                }
                this.adminService.activeWorkerScreens$.next(userScreens);
                this.adminService.activeWorker$.next(this.worker);

                this.materialController.openSnackBar('Данные сохранены');
                this.closeWorkerSettings.emit(this.worker);
            } catch (error) {
                console.log(error.error);
                this.materialController.openSnackBar('Ошибка', 'snackbar-red');
            }
        }
    }
}
