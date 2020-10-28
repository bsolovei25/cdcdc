import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IUser, IUnitEvents } from '../../../../../dashboard/models/EVJ/events-widget';
import { IAlertWindowModel } from '../../../../../@shared/models/alert-window.model';
import { IInputOptions } from '../../../../../@shared/models/input.model';
import { IAlertPasswordModel } from '../../../../../@shared/models/alert-password.model';
import { IGlobalClaim, IWorkspace } from '../../../../../dashboard/models/ADMIN/admin-panel';
import { Subscription } from 'rxjs';
import { IWidget } from '../../../../../dashboard/models/widget.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminPanelService } from '../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';
import { SnackBarService } from '../../../../../dashboard/services/snack-bar.service';
import { fillDataShape } from '@shared/functions/common-functions';
import { base64ToFile } from 'ngx-image-cropper';
import { IUnits } from '../../../../../dashboard/models/ADMIN/admin-shift-schedule';

@Component({
    selector: 'evj-admin-worker-settings',
    templateUrl: './admin-worker-settings.component.html',
    styleUrls: ['./admin-worker-settings.component.scss']
})
export class AdminWorkerSettingsComponent implements OnInit, OnDestroy {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public isImportNewWorker: boolean = false;

    @Output() public closeWorkerSettings: EventEmitter<IUser> = new EventEmitter<IUser>();

    public toggleClaim: boolean = false;

    public alert: IAlertWindowModel = null;
    public isDataChanged: boolean = false;

    public isClaimsShowing: boolean = true;

    public isPopUpShowing: boolean = false;
    public isAvatarButtonShowing: boolean = false;

    private isResetPassword: boolean = false;

    public isCreateClaim: boolean = false;

    //#region SEARCH_INPUT_OPTIONS
    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите название пункта',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false
        }
    };

    public searchingFieldName: string = '';
    //#endregion

    //#region PASSWORD_OPTIONS
    public passwordOptions: IAlertPasswordModel = {
        isShow: false,
        isCreatePassword: true,
        acceptFunction: this.onSetWorkerPassword.bind(this),
        closeFunction: () => (this.passwordOptions.isShow = false)
    };
    //#endregion

    public worker: IUser = null;
    private workerPhoto: string = null;

    private workerGeneralClaims: IGlobalClaim[] = [];
    public workerSpecialClaims: IGlobalClaim[] = [];

    public workerScreens: IWorkspace[] = [];

    public allGeneralClaims: IGlobalClaim[] = [];
    public allSpecialClaims: IGlobalClaim[] = [];

    private subscriptions: Subscription[] = [];

    public isDataLoading: boolean = false;

    public allWidgets: IWidget[] = [];

    public claimsSelector: SelectionModel<IGlobalClaim> = new SelectionModel<IGlobalClaim>();

    constructor(
        private adminService: AdminPanelService,
        private materialController: SnackBarService
    ) {
    }

    public ngOnInit(): void {
        if (this.isCreateNewUser) {
            this.adminService.setDefaultActiveWorker();
        }

        this.alert = this.adminService.settingsAlert;
        this.subscriptions.push(
            this.adminService.activeWorker$.subscribe((worker: IUser) => {
                this.worker = fillDataShape(worker);
            }),
            this.adminService.activeWorkerWorkspaces$.subscribe((workerScreens) => {
                this.workerScreens = workerScreens;
            })
        );

        if (!!this.worker.id) {
            this.subscriptions.push(
                this.adminService.getWorkerGeneralClaims(this.worker.id).subscribe((claims) => {
                    this.workerGeneralClaims = claims.data;
                }),
                this.adminService.getWorkerSpecialClaims(this.worker.id).subscribe((claims) => {
                    this.workerSpecialClaims = claims.data;

                    this.workerSpecialClaims.forEach((value) => {
                        if (value.claimValueType === 'widget') {
                            if (!value.widgets) {
                                value.widgets = [];
                            }
                            value.widgets.push(this.findEntityByClaimValueWidget(value));
                        } else {
                            if (!value.units) {
                                value.units = [];
                            }
                            value.units.push(this.findEntityByClaimValueUnit(value));
                        }
                    });
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

    public onChangeWorkerData(): void {
        this.isDataChanged = true;
    }

    public onChangePassword(isResetPassword: boolean): void {
        if (!isResetPassword) {
            this.passwordOptions.isShow = true;
        } else {
            this.alert.questionText = `Вы действительно хотите сбросить пароль для пользователя
             ${this.worker.lastName} ${this.worker.firstName} ${this.worker.middleName}?`;
            this.alert.acceptText = 'Подтвердить';
            this.alert.acceptFunction = () => {
                this.isResetPassword = true;
                this.isDataChanged = true;
            };
            this.alert.isShow = true;
        }
    }

    public onChangeWorkspacesData(): void {
        this.isDataChanged = true;
    }

    public onSetWorkerPassword(password: string): void {
        if (password && this.isCreateNewUser) {
            this.worker.password = password;
            this.isDataChanged = true;
        }
    }

    public onClosePopUp(event: string): void {
        this.isPopUpShowing = false;
        if (event) {
            this.workerPhoto = event;
            this.isDataChanged = true;
        }
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

    public findEntityByClaimValueUnit(claim: IGlobalClaim): IUnitEvents {
        let entity: IUnitEvents | IWidget;
        switch (claim.claimValueType) {
            case 'unit':
                entity = this.adminService.units.find((item) => item.id === +claim.value);
                return entity;
        }
    }

    public findEntityByClaimValueWidget(claim: IGlobalClaim): IWidget {
        let entity: IUnitEvents | IWidget;
        switch (claim.claimValueType) {
            case 'widget':
                entity = this.adminService.allWidgets.find((item) => item.id === claim.value);
                return entity;
        }
    }


    public createSpecialClaim(): void {
        this.isCreateClaim = true;
    }

    public onCreateSpecialClaim(claims: IGlobalClaim[]): void {
        if (claims) {
            this.workerSpecialClaims = [];
            claims.forEach((claim) => {
                this.workerSpecialClaims.push(claim);
            });
            this.isDataChanged = true;
        }
        this.isCreateClaim = false;

    }

    public onRemoveSpecialClaim(claim: IWidget | IUnitEvents): void {
        let index: number;
        this.workerSpecialClaims.forEach(workerClaim => {
            index = -1;
            workerClaim?.units?.forEach((unit, i) => {
                if (unit.id === claim.id) {
                    index = i;
                }
            });
            workerClaim?.widgets?.findIndex((widget, i) => {
                if (widget.id === claim.id) {
                    index = i;
                }
            });
            if (index > -1) {
                workerClaim?.widgets?.splice(index, 1);
                workerClaim?.units?.splice(index, 1);
            }
            index = -1;
        });
        // this.workerSpecialClaims.splice(index, 1);
        this.isDataChanged = true;
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
        this.isDataChanged = true;
    }

    public onChangeLockWorker(): void {
        console.log('CHANGE LOCK STATUS');
        this.isDataChanged = true;
    }

    public onRemoveWorker(): void {
        this.alert.questionText = `Вы действительно хотите удалить профайл
        пользователя ${this.worker.displayName} из Системы?`;
        this.alert.acceptText = 'Подтвердить';
        this.alert.cancelText = 'Вернуться';
        this.alert.acceptFunction = async () => {
            try {
                await this.adminService.deleteWorker(this.worker.id);
                this.materialController.openSnackBar(
                    `Пользователь ${this.worker.displayName} успешно удален из Системы`
                );
                this.adminService.setDefaultActiveWorker();
                this.closeWorkerSettings.emit();
            } catch (err) {
                this.materialController.openSnackBar(
                    `Запрос на удаление пользователя ${this.worker.displayName} не был обработан`,
                    'snackbar-red'
                );
            }
        };
        this.alert.isShow = true;
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
        this.worker.photoId = user?.photoId;
    }

    public onClickButton(isSaveClicked: boolean): void {
        if (isSaveClicked && this.isDataChanged) {
            this.alert.questionText = 'Сохранить внесенные изменения?';
            this.alert.acceptText = 'Сохранить';
            this.alert.acceptFunction = this.onSave.bind(this);
        } else if (this.isDataChanged) {
            this.alert.questionText = `Вы действительно хотите вернуться?
                Все внесенные изменения будут утрачены!`;
            this.alert.acceptText = 'Подтвердить';
            this.alert.acceptFunction = this.onReturn.bind(this);
        } else {
            this.onReturn();
        }
        this.alert.isShow = this.isDataChanged;
    }

    private checkForRequiredFields(): boolean {
        const messages = {
            firstName: 'Имя',
            lastName: 'Фамилия',
            login: 'Логин',
            email: 'Эл.почта'
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
        this.closeWorkerSettings.emit();
    }

    public async onSave(): Promise<void> {
        if (this.checkForRequiredFields()) {
            this.isDataLoading = true;
            try {
                const newArray: IGlobalClaim[] = [];
                this.workerSpecialClaims?.forEach(v => v?.widgets?.forEach(w => {
                    if (w?.isActive) {
                        newArray?.push({
                            claimType: v?.claimType,
                            value: w?.id,
                            claimValueType: v?.claimValueType,
                            claimName: v?.claimName,
                            additionalType: v?.additionalType,
                            claimCategory: v?.claimCategory,
                            claimCategoryName: v?.claimCategoryName,
                            claimValueTypeName: v?.claimValueTypeName,
                            description: v?.description,
                            specification: v?.specification
                        });
                    }
                }));
                this.workerSpecialClaims?.forEach(v => v?.units?.forEach(u => {
                    if (u?.isActive) {
                        newArray.push({
                            claimType: v?.claimType,
                            value: u?.id.toString(),
                            claimValueType: v?.claimValueType,
                            claimName: v?.claimName,
                            additionalType: v?.additionalType,
                            claimCategory: v?.claimCategory,
                            claimCategoryName: v?.claimCategoryName,
                            claimValueTypeName: v?.claimValueTypeName,
                            description: v?.description,
                            specification: v?.specification
                        });
                    }
                }));
                this.worker.displayName = this.adminService.generateDisplayName(this.worker);
                this.worker.claims = this.workerGeneralClaims.concat(newArray);
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

                if (this.isResetPassword) {
                    await this.adminService.resetUserPassword(this.worker.id).toPromise();
                }

                await this.adminService.updateAllWorkers();
                const userScreens: {
                    data: IWorkspace[];
                } = await this.adminService.getAllWorkerScreenClaims(this.worker.id).toPromise();

                this.adminService.activeWorkerWorkspaces$.next(userScreens.data);
                this.adminService.activeWorker$.next(this.worker);

                this.materialController.openSnackBar('Данные сохранены');
                this.isDataChanged = false;
            } catch (error) {
                console.log(error);
            } finally {
                this.isDataLoading = false;
            }
        }
    }
}
