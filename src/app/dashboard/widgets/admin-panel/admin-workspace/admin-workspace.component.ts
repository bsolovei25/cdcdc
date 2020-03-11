import { Component, OnInit, ViewChild } from '@angular/core';
import { IWorkspace } from '../../../models/admin-panel';

@Component({
    selector: 'evj-admin-workspace',
    templateUrl: './admin-workspace.component.html',
    styleUrls: ['./admin-workspace.component.scss'],
})
export class AdminWorkspaceComponent implements OnInit {
    public isWorkspaceActive: boolean = true;

    public searchValue: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workspaces: IWorkspace[] = [];

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
