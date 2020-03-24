import { Component, OnInit } from '@angular/core';
import { IButtonImgSrc } from '../../../models/admin-panel';

@Component({
    selector: 'evj-admin-groups',
    templateUrl: './admin-groups.component.html',
    styleUrls: ['./admin-groups.component.scss'],
})
export class AdminGroupsComponent implements OnInit {
    public searchIcon: string = 'assets/icons/search-icon.svg';
    public plusIcon: IButtonImgSrc = {
        btnIconSrc: 'assets/icons/plus-icon.svg',
    };

    // Mocked data
    public groups = [
        {
            id: 1,
            name: 'Группа №1',
            description: 'Описание',
        },
        {
            id: 2,
            name: 'Группа №2',
            description: 'Описание',
        },
        {
            id: 3,
            name: 'Группа №3',
            description: 'Описание',
        },
        {
            id: 4,
            name: 'Группа №4',
            description: 'Описание',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    public onSearchGroup(event: string): void {
        console.log(event);
    }

    public onSearchUser(event: string): void {
        console.log(event);
    }

    public createNewBrigade(): void {}
}
