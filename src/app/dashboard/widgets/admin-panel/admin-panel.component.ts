import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IButtonImgSrc, IBrigadeAdminPanel, IClaim, IGlobalClaim } from '../../models/admin-panel';
import { AdminPanelService } from '../../services/admin-panel/admin-panel.service';
import { IUser, IUnitEvents } from '../../models/events-widget';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

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
    public searchIcon: string = 'assets/icons/search-icon.svg';
    //#endregion

    //#region WIDGET_FLAGS
    public isBrigadesShowed: boolean = false;
    public isWorkerSettingsShowed: boolean = false;
    public isGroupsShowed: boolean = false;
    public isCreateNewWorker: boolean = false;
    public isImportNewWorker: boolean = false;
    public isDropdownShowed: boolean = false;
    public isPopupShowed: boolean = false;
    //#endregion

    public searchPlaceholder: string = 'Введите ФИО сотрудника';
    public searchedWorker: string = '';

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

    static itemCols: number = 45;
    static itemRows: number = 25;

    private subscriptions: Subscription[] = [];

    constructor(
        private widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private adminService: AdminPanelService
    ) {}

    public ngOnInit(): void {
        this.adminService.updateAllWorkers().then();
        this.adminService.updateAllBrigades().then();
        this.subscriptions.push(
            this.adminService.allWorkers$.subscribe((workers: IUser[]) => {
                this.workers = workers;
            }),
            this.adminService.allBrigades$.subscribe((brigades: IBrigadeAdminPanel[]) => {
                this.brigades = brigades;
            }),
            this.adminService.getAllScreenClaims().subscribe((data: IClaim[]) => {
                this.adminService.screenClaims = data;
            }),
            this.adminService.getAllSpecialScreenClaims().subscribe((data) => {
                this.adminService.screenSpecialClaims = data.data;
            }),
            this.adminService
                .getAllUnitsWithBrigades()
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
            this.adminService.activeWorker$.subscribe((worker) => {
                if (worker.sid) {
                    this.isImportNewWorker = true;
                } else {
                    this.isImportNewWorker = false;
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
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
    }

    public onCloseLdapList(event: boolean): void {
        if (event) {
            this.isWorkerSettingsShowed = true;
            this.isImportNewWorker = true;
        }
        this.isPopupShowed = false;
    }

    public onSearchWorker(inputedValue: string): void {
        this.searchedWorker = inputedValue;
    }

    public onShowBrigades(): void {
        this.isBrigadesShowed = !this.isBrigadesShowed;
        this.searchPlaceholder = this.isBrigadesShowed
            ? 'Введите название бригады'
            : 'Введите ФИО сотрудника';
    }

    public onHideGroups(): void {
        this.isGroupsShowed = false;
    }
}
