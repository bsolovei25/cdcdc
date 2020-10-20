import { Component, OnInit, Input } from '@angular/core';
import { IWorkspace, ScreenClaimsEnum } from '../../../../../../dashboard/models/ADMIN/admin-panel';

@Component({
    selector: 'evj-admin-workspace-card',
    templateUrl: './admin-workspace-card.component.html',
    styleUrls: ['./admin-workspace-card.component.scss'],
})
export class AdminWorkspaceCardComponent implements OnInit {
    @Input() public workspace: IWorkspace;

    constructor() {}

    public ngOnInit(): void {}

    public getClaim(): string {
        const maxClaim = this.workspace.claims.reduce((mainClaim, item) => {
            if (ScreenClaimsEnum[mainClaim.claimType] < ScreenClaimsEnum[item.claimType]) {
                return item;
            }
            return mainClaim;
        });
        return maxClaim.claimName;
    }
}
