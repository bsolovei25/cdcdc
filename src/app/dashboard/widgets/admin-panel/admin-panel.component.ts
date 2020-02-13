import { Component, OnInit } from '@angular/core';
import { IButtonImgSrc } from '../../models/admin-panel';
import { IWorker } from '../../models/worker';

@Component({
    selector: 'evj-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
    public isMock: boolean = false;

    public id: number = null;
    public uniqId: number = null;

    public title: string = 'Панель администратора';
    public previewTitle: string = 'Панель администратора';
    public units: string = '';

    public newHumanButtonIcon: IButtonImgSrc = {
        btnIconSrc: '../../../../assets/icons/widgets/admin/newWorkerIcon-active.svg',
    };
    public groupsButtonIcon: IButtonImgSrc = {
        btnIconSrc: '../../../../assets/icons/widgets/admin/icon_group-active.svg',
    };

    public man: IWorker = {
        name: 'Иванов Иван Сергеевич',
        phone: '+ 7 (925) 599-99-87',
        email: 'Ivanov@gazprom-neft.ru',
        brigade: 'Бригада №1',
        accessLevel: 'Высокий уровень доступа',
        position: 'Старший оператор | КИПиА',
    };

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {}
}
