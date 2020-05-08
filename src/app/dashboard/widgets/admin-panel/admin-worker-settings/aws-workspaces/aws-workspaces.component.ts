import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkspace, IGlobalClaim } from '../../../../models/admin-panel';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-workspaces',
    templateUrl: './aws-workspaces.component.html',
    styleUrls: ['./aws-workspaces.component.scss'],
})
export class AwsWorkspacesComponent implements OnInit {
    @Input() public workerScreens: IWorkspace[] = [];
    @Input() public workerSpecialClaims: IGlobalClaim[] = [];

    @Output() private changeWorkspaces: EventEmitter<void> = new EventEmitter<void>();

    public allWorkspaces: IWorkspace[] = null;

    public searchIcon: string = 'assets/icons/search-icon.svg';

    private searchingWorkspaceValue: string = '';

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.allWorkspaces = this.adminService.allScreens;
    }

    public onSearchWorkspace(searchedWorkspace: string): void {
        this.searchingWorkspaceValue = searchedWorkspace.toLowerCase();
    }

    public isValidWorkspaceName(workspaceName: string): boolean {
        return workspaceName.toLowerCase().includes(this.searchingWorkspaceValue);
    }

    public defineIsWorkspaceActive(workspace: IWorkspace): boolean {
        return !!this.workerScreens.find((item: IWorkspace) => item.id === workspace.id);
    }

    public onChangeFields(): void {
        this.changeWorkspaces.emit();
    }
}
