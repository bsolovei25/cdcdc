import { Component, OnInit, OnDestroy } from '@angular/core';
import { IWorkspace } from '../../../models/admin-panel';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';
import { Subscription } from 'rxjs';
import { IInputOptions } from '../../../../@shared/models/input.model';

@Component({
    selector: 'evj-admin-workspace',
    templateUrl: './admin-workspace.component.html',
    styleUrls: ['./admin-workspace.component.scss'],
})
export class AdminWorkspaceComponent implements OnInit, OnDestroy {
    public isWorkspaceActive: boolean = true;

    //#region SEARCH_REGION
    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите название рабочей области',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false,
        },
    };

    public searchValue: string = '';
    //#endregion

    public workspaces: IWorkspace[] = [];

    private subscriptions: Subscription[] = [];

    constructor(private adminPanel: AdminPanelService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.adminPanel.activeWorkerWorkspaces$.subscribe((data) => {
                if (data) {
                    this.workspaces = data;
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onSearchWorkspace(workspaceName: string): boolean {
        const workspaceNameValue: string = workspaceName.toLowerCase();
        return workspaceNameValue.includes(this.searchValue.toLowerCase());
    }
}
