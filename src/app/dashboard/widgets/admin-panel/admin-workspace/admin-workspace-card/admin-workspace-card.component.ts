import { Component, OnInit, Input } from '@angular/core';
import { IWorkspace } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-admin-workspace-card',
    templateUrl: './admin-workspace-card.component.html',
    styleUrls: ['./admin-workspace-card.component.scss'],
})
export class AdminWorkspaceCardComponent implements OnInit {
    @Input() workspace: IWorkspace;

    constructor() {}

    public ngOnInit(): void {}
}
