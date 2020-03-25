import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IWorkspace, IScreen, IClaim } from '../../../models/admin-panel';
import { IUser, IUnitEvents } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';
import { MaterialControllerService } from '../../../services/material-controller.service';
import { base64ToFile } from 'ngx-image-cropper';

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

    public isPopUpShowing: boolean = false;
    public isAvatarButtonShowing: boolean = false;

    public isBrigadeResponsibleAlertShowing: boolean = false;
    public isSetResponsible: boolean = false;

    public isPasswordAlertShowing: boolean = true;

    public searchingWorkspaceValue: string = '';
    public searchingFieldName: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public worker: IUser = null;
    public workerUnit: IUnitEvents = null;
    private workerPhoto: string = null;
    private newWorkerPassword: string = null;

    public allWorkspaces: IWorkspace[] = [];
    public workerScreens: IWorkspace[] = [];
    public workerScreensDetached: IScreen[] = [];
    public workspacesClaims: { workspaceId: number; claims: IClaim[] }[] = [];

    private subscriptions: Subscription[] = [];

    public isDataLoading: boolean = false;

    constructor(
        private adminService: AdminPanelService,
        private materialController: MaterialControllerService
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe((worker: IUser) => {
                this.worker = fillDataShape(worker);
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
            this.adminService.activeWorkerUnit$.subscribe(
                (unit: IUnitEvents) => (this.workerUnit = unit)
            ),
            this.adminService.getAllScreens().subscribe((data: IWorkspace[]) => {
                this.allWorkspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    private showAlert(): void {
        this.isCheckBoxClicked = false;
        this.isAlertShowing = true;
    }

    //#region SEARCH

    public onSearchField(searchedField: string): void {
        this.searchingFieldName = searchedField.toLowerCase();
    }

    public onSearchWorkspace(searchedWorkspace: string): void {
        this.searchingWorkspaceValue = searchedWorkspace.toLowerCase();
    }

    //#endregion

    public onChangeWorkerData(data: IUnitEvents): void {
        this.showAlert();
        this.workerUnit = data;
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
        if (event) {
            this.showAlert();
            this.newWorkerPassword = event;
        }
    }

    private async changeWorkspaceClaims(): Promise<void> {
        this.workspacesClaims.forEach(async (wsClaim) => {
            const screen: IScreen = this.workerScreensDetached.find(
                (item: IScreen) => item.screen.id === wsClaim.workspaceId
            );

            if (screen) {
                await this.adminService
                    .setWorkerScreenClaims(screen.id, wsClaim.claims)
                    .toPromise();
            }
        });
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

    public onClosePopUp(event: string): void {
        this.isPopUpShowing = false;
        if (event) {
            this.showAlert();

            this.workerPhoto = event;
        }
    }

    public onCloseResponsibleAlert(): void {
        this.isBrigadeResponsibleAlertShowing = false;
    }

    public onSelectClaim(): void {
        this.showAlert();
    }

    public onChangeLockWorker(): void {
        this.showAlert();
        console.log('CHANGE LOCK STATUS');
    }

    public returnPhotoPath(): string {
        return this.workerPhoto ? this.workerPhoto : this.adminService.getPhotoLink(this.worker);
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
        await this.changeWorkspaceClaims();
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
            this.isDataLoading = true;
            try {
                this.worker.displayName = this.adminService.generateDisplayName(this.worker);

                if (this.workerPhoto) {
                    this.worker.photoId = await this.adminService.pushWorkerPhoto(
                        base64ToFile(this.workerPhoto)
                    );
                }

                this.isCreateNewUser ? await this.onCreateNewWorker() : await this.onEditWorker();
                if (this.worker.position === 'responsible') {
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
                this.adminService.activeWorkerUnit$.next(this.workerUnit);

                this.isDataLoading = false;

                this.materialController.openSnackBar('Данные сохранены');
                this.closeWorkerSettings.emit(this.worker);
            } catch (error) {
                console.log(error.error);
                this.isDataLoading = false;
            }
        }
    }
}
