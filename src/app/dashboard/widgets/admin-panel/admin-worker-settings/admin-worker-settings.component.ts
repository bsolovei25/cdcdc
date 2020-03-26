import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import {
    IWorkerOptionAdminPanel,
    IWorkspace,
    IScreen,
    IBrigadeAdminPanel,
} from '../../../models/admin-panel';
import { IUser } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';
import { IBrigade } from '../../../models/shift.model';

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

    public isBrigadeResponsibleAlertShowing: boolean = false;
    public isSetResponsible: boolean = false;

    public isPasswordAlertShowing: boolean = false;

    public searchingWorkspaceValue: string = '';
    public searchingFieldName: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public options: IWorkerOptionAdminPanel[];

    public worker: IUser = null;
    public workerUnit: IUnitEvents = null;
    private workerPhoto: string = null;
    private newWorkerPassword: string = null;

    public allWorkspaces: IWorkspace[] = [];
    public workerScreens: IWorkspace[] = [];
    public workerScreensDetached: IScreen[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private adminService: AdminPanelService) {}

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
                        name: 'Бригада',
                        value: this.worker.brigade.number,
                        key: 'brigade',
                    },
                ];
            }),
            this.adminService.activeWorkerScreens$.subscribe((workerScreens: IScreen[]) => {
                if (workerScreens) {
                    workerScreens.forEach((item: IScreen) => {
                        this.workerScreens.push(item.screen);
                    });
                    this.workerScreensDetached = workerScreens;
                } else {
                    this.workerScreens = [];
                    this.workerScreensDetached = [];
                }
            }),
            this.adminService.getAllScreens().subscribe((data: IWorkspace[]) => {
                this.allWorkspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

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

    public onSetResponsible(event: boolean): void {
        this.showAlert();
        this.isBrigadeResponsibleAlertShowing = true;
        this.isSetResponsible = event;
    }

    public onChangeWorkspacesData(): void {
        this.showAlert();
    }

    public onSetWorkerPassword(event: string): void {
        this.isPasswordAlertShowing = false;
        if (event && this.isCreateNewUser) {
            this.showAlert();
            this.worker.password = event;
            this.newWorkerPassword = event;
        }
    }

    private async changeWorkspaceClaims(): Promise<void> {
        this.workspacesClaims.forEach(async (wsClaim) => {
            const screen: IScreen = this.workerScreensDetached.find(
                (item: IScreen) => item.screen.id === wsClaim.workspaceId
            );
            this.workerScreens.splice(index, 1);
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
        this.worker.brigade = { id: brigade.id, number: brigade.number.toString() };
    }

    public onCloseResponsibleAlert(): void {
        this.isBrigadeResponsibleAlertShowing = false;
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
            promises.push(this.adminService.addWorkerScreen(this.worker.id, index).toPromise());
        });
        Promise.all(promises);
    }

    private async onEditWorker(): Promise<void> {
        const promises: Promise<void>[] = [];

        promises.push(this.adminService.editWorkerData(this.worker).toPromise());
        this.addWorkspacesToWorker().forEach((index: number) => {
            promises.push(this.adminService.addWorkerScreen(this.worker.id, index).toPromise());
        });
        this.removeWorkspacesFromWorker().forEach((index: number) => {
            promises.push(this.adminService.removeWorkerScreen(index).toPromise());
        });

        await Promise.all(promises);
    }

    public onReturn(): void {
        this.closeWorkerSettings.emit(null);
    }

    public async onSave(): Promise<void> {
        if (this.isCheckBoxClicked) {
            try {
                this.isCreateNewUser ? await this.onCreateNewWorker() : await this.onEditWorker();

                this.worker.displayName = this.adminService.generateDisplayName(this.worker);
                await this.adminService.updateAllWorkers();
                await this.adminService.updateAllBrigades();
                const userScreens: IScreen[] = await this.adminService
                    .getWorkerScreens(this.worker.id)
                    .toPromise();
                const newActiveBrigade = this.adminService.brigades.find(
                    (brigade) => brigade.brigadeId === this.worker.brigade.id
                );
                this.adminService.activeBrigade$.next(newActiveBrigade);
                this.adminService.activeWorkerScreens$.next(userScreens);
                this.adminService.activeWorker$.next(this.worker);

                this.closeWorkerSettings.emit(this.worker);
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}
