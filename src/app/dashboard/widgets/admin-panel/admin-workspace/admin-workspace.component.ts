import { Component, OnInit, OnDestroy } from '@angular/core';
import { IWorkspace, IScreen } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-admin-workspace',
    templateUrl: './admin-workspace.component.html',
    styleUrls: ['./admin-workspace.component.scss'],
})
export class AdminWorkspaceComponent implements OnInit, OnDestroy {
    public isWorkspaceActive: boolean = true;

    public searchValue: string = '';

    public searchIcon: string = 'assets/icons/search-icon.svg';

    public workspaces: IScreen[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminPanel.activeWorkerScreens$.subscribe((data: IScreen[]) => {
                this.workspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onInput(inputVal: string): void {
        this.searchValue = inputVal;
    }

    public onSearchWorkspace(workspaceName: string): boolean {
        const workspaceNameValue: string = workspaceName.toLowerCase();
        return workspaceNameValue.includes(this.searchValue.toLowerCase());
    }
}
