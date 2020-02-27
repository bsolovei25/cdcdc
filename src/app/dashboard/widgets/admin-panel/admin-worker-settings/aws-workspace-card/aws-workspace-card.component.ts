import { Component, OnInit, Input } from '@angular/core';
import { IWorkspace } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-aws-workspace-card',
    templateUrl: './aws-workspace-card.component.html',
    styleUrls: ['./aws-workspace-card.component.scss'],
})
export class AwsWorkspaceCardComponent implements OnInit {
    @Input() public workspace: IWorkspace = {
        name: '',
        authorId: null,
    };

    @Input() public author: string = '';
    @Input() public isActive: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
