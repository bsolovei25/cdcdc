import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IButtonImgSrc, IWorkspace } from '../../../dashboard/models/admin-panel';
import { IInputOptions } from '../../../@shared/models/input.model';
import { IUser, IUnitEvents } from '../../../dashboard/models/events-widget';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AdminPanelService } from '../../../dashboard/services/admin-panel/admin-panel.service';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'evj-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    //#region WIDGET_PROPS
    public title: string = 'Панель администратора';
    public previewTitle: string = 'admin-panel';
    public units: string = '';
    //#endregion

    //#region WIDGET_ICONS
    public groupsButtonIcon: IButtonImgSrc = {
        btnIconSrc: 'assets/icons/widgets/admin/icon_group-active.svg',
    };
    //#endregion

    //#region WIDGET_FLAGS
    public isDataLoading: boolean = true;
    public isWorkerSettingsShowed: boolean = false;
    public isGroupsShowed: boolean = false;
    public isCreateNewWorker: boolean = false;
    public isImportNewWorker: boolean = false;
    public isDropdownShowed: boolean = false;
    public isPopupShowed: boolean = false;
    //#endregion

    //#region SEARCH_INPUT_OPTIONS
    public inputOptions: IInputOptions = {
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

    public searchedWorker: string = '';
    //#endregion

    public workers: IUser[] = null;
    public activeWorker: IUser = null;

    public man: IUser = {
        id: 1,
        login: '',
        firstName: 'Петр',
        lastName: 'Петров',
        middleName: 'Петрович',
        phone: '+ 7 (925) 599-99-87',
        email: 'Ivanov@gazprom-neft.ru',
        brigade: {
            id: 1,
            number: '1',
        },
        position: 'common',
        positionDescription: 'Оператор ТУ',
        displayName: 'Петров П. П.',
        isShiftWorker: false,
    };

    constructor(
        protected widgetService: WidgetService,
        private adminService: AdminPanelService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.adminService.setDefaultActiveWorker();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.isDataLoading = true;
        this.adminService.updateAllWorkers().then();
        const serviceData = combineLatest([
            this.adminService.allWorkers$,
            this.adminService.activeWorker$,
        ]);
        this.subscriptions.push(
            serviceData.subscribe(([workers, activeWorker]) => {
                if (workers) {
                    this.workers = workers;
                    this.isDataLoading = false;
                }
                if (activeWorker) {
                    this.isImportNewWorker = activeWorker.sid ? true : false;
                    this.activeWorker = activeWorker;
                }
            }),
            this.adminService.getAllSpecialScreenClaims().subscribe((data) => {
                this.adminService.screenSpecialClaims = data.data;
            }),
            this.adminService
                .getAllUnits()
                .subscribe((data: IUnitEvents[]) => (this.adminService.units = data)),
            this.adminService
                .getAllGeneralClaims()
                .subscribe((claims) => (this.adminService.generalClaims = claims.data)),
            this.adminService
                .getAllSpecialClaims()
                .subscribe((claims) => (this.adminService.specialClaims = claims.data)),
            this.adminService
                .getAllWidgets()
                .subscribe((widgets) => (this.adminService.allWidgets = widgets.data)),
            this.adminService
                .getAllScreens()
                .subscribe((data: IWorkspace[]) => (this.adminService.allScreens = data))
        );
    }

    protected dataHandler(ref: any): void {}

    public createNewWorker(): void {
        this.isDropdownShowed = false;
        this.isCreateNewWorker = true;
        this.isWorkerSettingsShowed = true;
        this.adminService.setDefaultActiveWorker();
    }

    public getMoreAboutWorker(): void {
        if (this.activeWorker?.id) {
            this.isWorkerSettingsShowed = true;
        }
    }

    public onShowGroups(): void {
        this.isGroupsShowed = true;
    }

    public onCloseWorkerSettings(): void {
        this.isCreateNewWorker = false;
        this.isWorkerSettingsShowed = false;
        this.isImportNewWorker = false;
        this.searchedWorker = '';
    }

    public onCloseLdapList(event: boolean): void {
        if (event) {
            this.isWorkerSettingsShowed = true;
            this.isImportNewWorker = true;
        }
        this.isPopupShowed = false;
    }

    public onHideGroups(): void {
        this.isGroupsShowed = false;
        this.searchedWorker = '';
    }

    public async updateUsers(): Promise<void> {
        this.isDataLoading = true;
        try {
            const a = await this.adminService.updateAllLdapUsers();
        } catch (err) {
            console.error(err);
        } finally {
            this.isDataLoading = false;
        }
    }
}
