import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkspace, IScreen, IClaim } from '../../../../models/admin-panel';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-workspaces',
    templateUrl: './aws-workspaces.component.html',
    styleUrls: ['./aws-workspaces.component.scss'],
})
export class AwsWorkspacesComponent implements OnInit {
    //  TODO
    @Input() public allWorkspaces: IWorkspace[] = null;
    @Input() public workerScreens: IWorkspace[] = null;
    @Input() private readonly workerScreensDetached: IScreen[] = null;
    @Input() public searchingWorkspaceValue: string = '';

    @Output() public workspacesData: EventEmitter<null> = new EventEmitter<null>();

    private workspacesClaims: { workspaceId: number; claims: IClaim[] }[] = [];

    constructor(private adminService: AdminPanelService) {}

    ngOnInit(): void {}

    public isValidWorkspaceName(workspaceName: string): boolean {
        return workspaceName.toLowerCase().includes(this.searchingWorkspaceValue);
    }

    public defineIsWorkspaceActive(workspace: IWorkspace): boolean {
        return !!this.workerScreens.find((item: IWorkspace) => item.id === workspace.id);
    }

    public defineWorkerScreenId(workspace: IWorkspace): number {
        const screen = this.workerScreensDetached.find(
            (item: IScreen) => item.screen.id === workspace.id
        );
        if (screen) {
            return screen.id;
        }
        return null;
    }

    public onSelectWorkspace(event: IWorkspace): void {
        if (!this.defineIsWorkspaceActive(event)) {
            this.workerScreens.push(event);
        } else {
            const index: number = this.workerScreens.findIndex(
                (item: IWorkspace) => item.id === event.id
            );
            this.workerScreens.splice(index, 1);
        }
        this.workspacesData.emit();
    }

    public onSelectWorkspaceClaims(event: { workspaceId: number; claims: IClaim[] }): void {
        const index: number = this.workspacesClaims.findIndex(
            (item) => item.workspaceId === event.workspaceId
        );
        if (index === -1) {
            this.workspacesClaims.push(event);
        } else {
            this.workspacesClaims.splice(index, 1);
            this.workspacesClaims.push(event);
        }
        this.workspacesData.emit();
    }
}
