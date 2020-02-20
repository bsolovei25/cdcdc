import { Component, OnInit, ViewChild } from '@angular/core';
import { IWorkspace } from '../../../models/admin-panel';

@Component({
    selector: 'evj-admin-workspace',
    templateUrl: './admin-workspace.component.html',
    styleUrls: ['./admin-workspace.component.scss'],
})
export class AdminWorkspaceComponent implements OnInit {
    public searchValue: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workspaces: IWorkspace[] = [
        {
            name: 'Рабочая область №1',
            authorId: 35,
        },
        {
            name: 'Рабочая область №2',
            authorId: 35,
        },
        {
            name: 'Рабочая область №3',
            authorId: 35,
        },
        {
            name: 'Рабочая область №4',
            authorId: 35,
        },
        {
            name: 'Рабочая область №5',
            authorId: 35,
        },
        {
            name: 'Рабочая область №6',
            authorId: 35,
        },
        {
            name: 'Рабочая область №7',
            authorId: 35,
        },
        {
            name: 'Рабочая область №8',
            authorId: 35,
        },
    ];

    constructor() {}

    public ngOnInit(): void {}

    public onInput(inputVal: string): void {
        this.searchValue = inputVal;
    }

    public onSearchWorkspace(workspaceName: string): boolean {
        const workspaceNameValue: string = workspaceName.toLowerCase();
        return workspaceNameValue.includes(this.searchValue.toLowerCase());
    }
}
