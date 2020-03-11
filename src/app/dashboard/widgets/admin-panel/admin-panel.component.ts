import { Component, OnInit, OnDestroy } from '@angular/core';
import { IButtonImgSrc } from '../../models/admin-panel';
import { IWorker } from '../../models/worker';
import { AdminPanelService } from '../../services/admin-panel/admin-panel.service';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit, OnDestroy {
    //#region WIDGET_PROPS

    public isMock: boolean = false;
    public id: number = null;
    public uniqId: number = null;
    public title: string = 'Панель администратора';
    public previewTitle: string = 'Панель администратора';
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

    private subscriptions: Subscription[] = [];

    // public man: IWorker = {
    //     id: 1,
    //     name: 'Иванов Иван Сергеевич',
    //     phone: '+ 7 (925) 599-99-87',
    //     email: 'Ivanov@gazprom-neft.ru',
    //     brigade: 'Бригада №1',
    //     accessLevel: 'Высокий уровень доступа',
    //     position: 'Старший оператор | КИПиА',
    // };

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminPanel.getAllWorkers().subscribe((data: IUser[]) => {
                this.adminPanel.workers = data;
                this.workers = this.adminPanel.workers;
            }),
            this.adminPanel.getBrigades().subscribe((data) => console.log(`brigades:`, data))
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public getMoreAboutWorker(): void {
        if (this.adminPanel.activeWorker.id) {
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
