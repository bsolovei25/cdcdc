import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IButtonImgSrc, IBrigadeAdminPanel, IWorkspace } from '../../models/admin-panel';
import { AdminPanelService } from '../../services/admin-panel/admin-panel.service';
import { IUser, IUnitEvents } from '../../models/events-widget';
import { Subscription, combineLatest } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { IInputOptions } from '../../../@shared/models/input.model';

@Component({
    selector: 'evj-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit, OnDestroy {
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
    public isDataLoading: boolean = false;

    public isBrigadesShowed: boolean = false;
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
    public brigades: IBrigadeAdminPanel[] = null;

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
    };

    public static itemCols: number = 43;
    public static itemRows: number = 28;

    public static minItemCols: number = 43;
    public static minItemRows: number = 28;

    private subscriptions: Subscription[] = [];

    constructor(
        private widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private adminService: AdminPanelService
    ) {}

    public ngOnInit(): void {
        this.isDataLoading = true;
        this.adminService.updateAllWorkers().then();
        this.adminService.updateAllBrigades().then();
        const serviceData = combineLatest([
            this.adminService.allWorkers$,
            this.adminService.allBrigades$,
            this.adminService.activeWorker$,
        ]);
        this.subscriptions.push(
            serviceData.subscribe(([workers, brigades, activeWorker]) => {
                if (workers) {
                    this.workers = workers;
                    this.isDataLoading = false;
                }
                if (brigades) {
                    this.brigades = brigades;
                }
                if (activeWorker) {
                    this.isImportNewWorker = activeWorker.sid ? true : false;
                }
            }),
            this.adminService.getAllSpecialScreenClaims().subscribe((data) => {
                this.adminService.screenSpecialClaims = data.data;
            }),
            this.adminService
                .getAllUnits()
                .subscribe((data: IUnitEvents[]) => (this.adminService.units = data)),
            this.adminService
                .getAllUnitsWithBrigades()
                .subscribe((data: IUnitEvents[]) => (this.adminService.unitsWithBrigades = data)),
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

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
        this.adminService.setDefaultActiveWorker();
    }

    public createNewWorker(): void {
        this.isDropdownShowed = false;
        this.isCreateNewWorker = true;
        this.isWorkerSettingsShowed = true;
        this.adminService.setDefaultActiveWorker();
    }

    public getMoreAboutWorker(): void {
        if (this.adminService.activeWorker.id) {
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

    public onShowBrigades(): void {
        this.isBrigadesShowed = !this.isBrigadesShowed;
        this.inputOptions.placeholder = this.isBrigadesShowed
            ? 'Введите название бригады'
            : 'Введите ФИО сотрудника';
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
