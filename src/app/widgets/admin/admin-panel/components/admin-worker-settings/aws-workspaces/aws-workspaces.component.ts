import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkspace, IGlobalClaim } from '../../../../../../dashboard/models/ADMIN/admin-panel.model';
import { IInputOptions } from '../../../../../../@shared/models/input.model';
import { AdminPanelService } from '../../../../../../dashboard/services/widgets/admin-panel/admin-panel.service';

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

    //#region SEARCH_INPUT_OPTIONS
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

    public searchingWorkspaceValue: string = '';
    //#endregion

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.allWorkspaces = this.adminService.allScreens;
    }

    public isValidWorkspaceName(workspaceName: string): boolean {
        return workspaceName.toLowerCase().includes(this.searchingWorkspaceValue.toLowerCase());
    }

    public defineIsWorkspaceActive(workspace: IWorkspace): boolean {
        return !!this.workerScreens.find((item: IWorkspace) => item.id === workspace.id);
    }

    public onChangeFields(): void {
        this.changeWorkspaces.emit();
    }
}
