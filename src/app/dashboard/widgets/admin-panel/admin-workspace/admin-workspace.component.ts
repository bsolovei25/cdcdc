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

    private subscription: Subscription[] = [];

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscription.push(
            this.adminPanel.activeWorkerScreens$.subscribe((data: IScreen[]) => {
                console.log(data);

                this.workspaces = data;
            })
        );
    }

    public ngOnDestroy(): void {}

    public onInput(inputVal: string): void {
        this.searchValue = inputVal;
    }

    public onSearchWorkspace(workspaceName: string): boolean {
        const workspaceNameValue: string = workspaceName.toLowerCase();
        return workspaceNameValue.includes(this.searchValue.toLowerCase());
    }
}
