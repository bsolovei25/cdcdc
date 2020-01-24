import { Component, OnInit } from '@angular/core';
import { IButtonImgSrc } from '../../models/admin';

@Component({
    selector: 'evj-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    public isMock: boolean = false;

    public id: number = null;
    public uniqId: number = null;

    public title: string = 'Панель администратора';
    public previewTitle: string = 'Панель администратора';
    public units: string = '';

    public newHumanButtonIcon: IButtonImgSrc = {
        active: '../../../../assets/icons/widgets/admin/newWorkerIcon-active.svg',
        normal: '../../../../assets/icons/widgets/admin/newWorkerIcon.svg',
    };
    public groupsButtonIcon: IButtonImgSrc = {
        active: '../../../../assets/icons/widgets/admin/icon_group-active.svg',
        normal: '../../../../assets/icons/widgets/admin/icon_group.svg',
    };

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {}
}
