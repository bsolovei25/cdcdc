import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IButtonImgSrc, IBrigadeAdminPanel, IClaim } from '../../models/admin-panel';
import { AdminPanelService } from '../../services/admin-panel/admin-panel.service';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';

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

    public isGroupShowed: boolean = false;
    public isWorkerSettingsShowed: boolean = false;

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
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private adminService: AdminPanelService
    ) {}

    public ngOnInit(): void {
        this.adminService.updateAllWorkers().then();
        this.subscriptions.push(
            this.adminService.allWorkers$.subscribe((workers: IUser[]) => {
                this.workers = workers;
            }),
            this.adminService.getBrigades().subscribe((data: IBrigadeAdminPanel[]) => {
                this.adminService.brigades = data;
                this.brigades = this.adminService.brigades;
            }),
            this.adminService.getAllScreenClaims().subscribe((data: IClaim[]) => {
                this.adminService.screenClaims = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public getMoreAboutWorker(): void {
        if (this.adminService.activeWorker.id) {
            this.isWorkerSettingsShowed = true;
        }
    }

    public onCloseWorkerSettings(): void {
        this.isWorkerSettingsShowed = false;
    }

    public onSearchWorker(inputedValue: string): void {
        this.searchedWorker = inputedValue;
    }

    public onShowBrigades(): void {
        this.isGroupShowed = !this.isGroupShowed;
        this.searchPlaceholder = this.isGroupShowed
            ? 'Введите номер бригады или ФИО сотрудника'
            : 'Введите ФИО сотрудника';
    }
}
