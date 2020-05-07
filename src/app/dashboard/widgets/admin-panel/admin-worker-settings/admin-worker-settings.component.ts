import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IWorkspace, IScreen, IClaim, IGlobalClaim } from '../../../models/admin-panel';
import { IUser, IUnitEvents } from '../../../models/events-widget';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { fillDataShape } from '../../../../@shared/common-functions';
import { base64ToFile } from 'ngx-image-cropper';
import { IWidgets } from '../../../models/widget.model';
import { SelectionModel } from '@angular/cdk/collections';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IAlertWindowModel } from '../../../../@shared/models/alert-window.model';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss'],
})
export class AdminWorkerSettingsComponent implements OnInit, OnDestroy {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public isImportNewWorker: boolean = false;

    @Output() public closeWorkerSettings: EventEmitter<IUser> = new EventEmitter<IUser>();

    public toggleClaim: boolean = false;

    public alert: IAlertWindowModel = {
        isShow: false,
        questionText: '',
        acceptText: '',
        cancelText: 'Вернуться',
        acceptFunction: () => null,
        cancelFunction: () => null,
        closeFunction: () => (this.alert.isShow = false),
    };

    public isClaimsShowing: boolean = true;

    public isPopUpShowing: boolean = false;
    public isAvatarButtonShowing: boolean = false;

    public isBrigadeResponsibleAlertShowing: boolean = false;
    public isSetResponsible: boolean = false;

    public isPasswordAlertShowing: boolean = false;
    private isResetPassword: boolean = false;

    public isCreateClaim: boolean = false;

    public searchingWorkspaceValue: string = '';
    public searchingFieldName: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public worker: IUser = null;
    public workerUnit: IUnitEvents = null;
    private workerPhoto: string = null;

    private workerGeneralClaims: IGlobalClaim[] = [];
    public workerSpecialClaims: IGlobalClaim[] = [];

    public workerScreens: IWorkspace[] = [];

    public allGeneralClaims: IGlobalClaim[] = [];
    public allSpecialClaims: IGlobalClaim[] = [];

    private subscriptions: Subscription[] = [];

    public isDataLoading: boolean = false;

    public allWidgets: IWidgets[] = [];

    public claimsSelector: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();

    constructor(
        private adminService: AdminPanelService,
        private materialController: SnackBarService
    ) {}

    public ngOnInit(): void {
        if (this.isCreateNewUser) {
            this.adminService.setDefaultActiveWorker();
        }

        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe((worker: IUser) => {
                this.worker = fillDataShape(worker);
            }),
            this.adminService.activeWorkerWorkspaces$.subscribe((workerScreens) => {
                this.workerScreens = workerScreens;
            }),
            this.adminService.activeWorkerUnit$.subscribe(
                (unit: IUnitEvents) => (this.workerUnit = unit)
            )
        );

        if (!!this.worker.id) {
            this.subscriptions.push(
                this.adminService.getWorkerGeneralClaims(this.worker.id).subscribe((claims) => {
                    this.workerGeneralClaims = claims.data;
                }),
                this.adminService.getWorkerSpecialClaims(this.worker.id).subscribe((claims) => {
                    this.workerSpecialClaims = claims.data;
                })
            );
        }
        this.allGeneralClaims = this.adminService.generalClaims;
        this.allSpecialClaims = this.adminService.specialClaims;
        this.allWidgets = this.adminService.allWidgets;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
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
        this.workerUnit = data;
    }

    public onSetResponsible(event: boolean): void {
        this.isBrigadeResponsibleAlertShowing = true;
        this.isSetResponsible = event;
    }

    public onChangePassword(isResetPassword: boolean): void {
        this.isResetPassword = isResetPassword;
        if (!isResetPassword) {
            this.isPasswordAlertShowing = true;
        } else {
        }
    }

    public onChangeWorkspacesData(): void {}

    public onSetWorkerPassword(event: string): void {
        this.isPasswordAlertShowing = false;
        if (event && this.isCreateNewUser) {
            this.worker.password = event;
        }
    }

    public onClosePopUp(event: string): void {
        this.isPopUpShowing = false;
        if (event) {
            this.workerPhoto = event;
        }
    }

    public onCloseResponsibleAlert(): void {
        this.isBrigadeResponsibleAlertShowing = false;
    }

    public checkForActiveClaim(claimType: string): boolean {
        const claim: IGlobalClaim = this.workerGeneralClaims.find(
            (item) => item.claimType === claimType
        );
        return !!claim;
    }

    public onSelectSpecialClaim(claim: IGlobalClaim): void {
        if (this.claimsSelector.isSelected(claim)) {
            this.claimsSelector.clear();
        } else {
            this.claimsSelector.select(claim);
        }
    }

    public canShowSpecialClaim(claim: IGlobalClaim): boolean {
        const isWorkerHasClaim: boolean = !!this.workerSpecialClaims.find(
            (item) => item.claimType === claim.claimType
        );
        const isClaimNotForScreen: boolean = !claim.claimType.includes('screen');
        return isWorkerHasClaim && isClaimNotForScreen;
    }

    public allEntitiesInSpecialType(claim: IGlobalClaim): IGlobalClaim[] {
        return this.workerSpecialClaims.filter((item) => item.claimType === claim.claimType);
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

    public createSpecialClaim(): void {
        this.isCreateClaim = true;
    }

    public onCreateSpecialClaim(claims: IGlobalClaim[]): void {
        if (claims) {
            claims.forEach((claim) => {
                const findClaim: boolean = !!this.workerSpecialClaims.find(
                    (item) => item.claimType === claim.claimType && item.value === claim.value
                );

                if (findClaim) {
                    return;
                }

                this.workerSpecialClaims.push(claim);
            });
        }

        this.isCreateClaim = false;
    }

    public onRemoveSpecialClaim(claim: IGlobalClaim): void {
        const index: number = this.workerSpecialClaims.findIndex(
            (item) => item.claimType === claim.claimType
        );
        this.workerSpecialClaims.splice(index, 1);
    }

    public onSelectGeneralClaim(claim: IGlobalClaim): void {
        const index: number = this.workerGeneralClaims.findIndex(
            (item) => item.claimType === claim.claimType
        );
        if (index === -1) {
            this.workerGeneralClaims.push(claim);
        } else {
            this.workerGeneralClaims.splice(index, 1);
        }
    }

    public onChangeLockWorker(): void {
        console.log('CHANGE LOCK STATUS');
    }

    public returnPhotoPath(): string {
        return this.workerPhoto ? this.workerPhoto : this.adminService.getPhotoLink(this.worker);
    }

    private async onCreateNewWorker(): Promise<void> {
        const user = await this.adminService.createNewWorker(this.worker).toPromise();
        this.worker.id = user.id;
    }

    private async onEditWorker(): Promise<void> {
        await this.adminService.editWorkerData(this.worker).toPromise();
    }

    private async onImportWorker(): Promise<void> {
        const user = await this.adminService.importUserFromLdap(this.worker).toPromise();
        this.worker.id = user.id;
    }

    public onClickButton(isSaveClicked: boolean): void {
        if (isSaveClicked) {
            this.alert.questionText = 'Сохранить внесенные изменения?';
            this.alert.acceptText = 'Сохранить';
            this.alert.acceptFunction = this.onSave.bind(this);
        } else {
            this.alert.questionText = `Вы действительно хотите вернуться?
                Все внесенные изменения будут утрачены!`;
            this.alert.acceptText = 'Подтвердить';
            this.alert.acceptFunction = this.onReturn.bind(this);
        }
        this.alert.isShow = true;
    }

    private checkForRequiredFields(): boolean {
        const messages = {
            firstName: 'Имя',
            lastName: 'Фамилия',
            login: 'Логин',
            email: 'Эл.почта',
        };

        let snackbarMessage: string = '';

        for (const key in messages) {
            if (!this.worker[key]) {
                snackbarMessage = `${snackbarMessage} ${messages[key]}`;
            }
        }

        if (this.isCreateNewUser && !this.worker.password) {
            snackbarMessage = `${snackbarMessage} Пароль`;
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
            !!this.worker.email
        );
    }

    public onReturn(): void {
        if (this.isCreateNewUser) {
            this.adminService.setDefaultActiveWorker();
        }
        this.closeWorkerSettings.emit(null);
    }

    public async onSave(): Promise<void> {
        if (this.checkForRequiredFields()) {
            this.isDataLoading = true;
            try {
                this.worker.displayName = this.adminService.generateDisplayName(this.worker);
                this.worker.claims = this.workerGeneralClaims.concat(this.workerSpecialClaims);

                if (this.workerPhoto) {
                    this.worker.photoId = await this.adminService.pushWorkerPhoto(
                        base64ToFile(this.workerPhoto)
                    );
                }

                if (this.isImportNewWorker && !this.worker.id) {
                    await this.onImportWorker();
                } else if (this.isCreateNewUser) {
                    await this.onCreateNewWorker();
                } else {
                    await this.onEditWorker();
                }

                if (this.worker.position === 'responsible') {
                    await this.adminService.setUserResponsible(this.worker.id).toPromise();
                }

                if (this.isResetPassword) {
                    await this.adminService.resetUserPassword(this.worker.id).toPromise();
                }

                await this.adminService.updateAllWorkers();
                await this.adminService.updateAllBrigades();
                const userScreens: {
                    data: IWorkspace[];
                } = await this.adminService.getAllWorkerScreenClaims(this.worker.id).toPromise();
                if (this.worker.hasOwnProperty('brigade')) {
                    const newActiveBrigade = this.adminService.brigades.find(
                        (brigade) => brigade.brigadeId === this.worker.brigade.id
                    );
                    this.adminService.activeBrigade$.next(newActiveBrigade);
                }
                this.adminService.activeWorkerWorkspaces$.next(userScreens.data);
                this.adminService.activeWorker$.next(this.worker);
                this.adminService.activeWorkerUnit$.next(this.workerUnit);

                this.materialController.openSnackBar('Данные сохранены');
            } catch (error) {
                console.log(error.error);
            } finally {
                this.isDataLoading = false;
            }
        }
    }
}
