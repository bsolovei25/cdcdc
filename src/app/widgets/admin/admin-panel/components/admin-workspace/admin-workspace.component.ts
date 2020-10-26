import { Component, OnInit, OnDestroy } from '@angular/core';
import { IInputOptions } from '../../../../../@shared/models/input.model';
import { IWorkspace } from '../../../../../dashboard/models/ADMIN/admin-panel';
import { Subscription } from 'rxjs';
import { AdminPanelService } from '../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';

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
        placeholder: 'Введите наименование рабочей области',
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
