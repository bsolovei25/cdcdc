import { Component, OnInit } from '@angular/core';

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

    constructor() {}

    ngOnInit(): void {}
}
