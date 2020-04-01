import { Component, OnInit, Input } from '@angular/core';
import {
    IWorkspace,
    IScreen,
    EnumClaims,
    IClaim,
    IGlobalClaim,
} from '../../../../models/admin-panel';

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
        enum ScreenClaims {
            screenView,
            screenEdit,
            screenDel,
            screenAdmin,
        }
        const maxClaim = this.workspace.claims.reduce((mainClaim, item) => {
            if (ScreenClaims[mainClaim.claimType] < ScreenClaims[item.claimType]) {
                return item;
            }
            return mainClaim;
        });
        return maxClaim.claimName;
    }
}
