import { Component, OnInit } from '@angular/core';
import { IButtonImgSrc } from '../../models/admin-panel';
import { IWorker } from '../../models/worker';
import { AdminPanelService } from '../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
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

    public man: IWorker = {
        id: 1,
        name: 'Иванов Иван Сергеевич',
        phone: '+ 7 (925) 599-99-87',
        email: 'Ivanov@gazprom-neft.ru',
        brigade: 'Бригада №1',
        accessLevel: 'Высокий уровень доступа',
        position: 'Старший оператор | КИПиА',
    };

    constructor(private adminPanel: AdminPanelService) {}

    ngOnInit(): void {}

    public getMoreAboutWorker(): void {
        this.isWorkerSettingsShowed = true;
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
