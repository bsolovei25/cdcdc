import { Component, OnInit, Input } from '@angular/core';
import { IWorkspace, IScreen, EnumClaims, IClaim } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-admin-workspace-card',
    templateUrl: './admin-workspace-card.component.html',
    styleUrls: ['./admin-workspace-card.component.scss'],
})
export class AdminWorkspaceCardComponent implements OnInit {
    @Input() public workspace: IScreen;

    constructor() {}

    public ngOnInit(): void {}

    public getClaim(): string {
        const mainClaim: IClaim = this.workspace.claims.reduce((maxIndex: IClaim, item: IClaim) => {
            if (item.id > maxIndex.id) {
                return item;
            }
            return maxIndex;
        });
        return EnumClaims[mainClaim.id];
    }
}
