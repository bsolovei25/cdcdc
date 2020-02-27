import { Component, OnInit } from '@angular/core';
import { IWorkspace } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-aws-workspace-card',
    templateUrl: './aws-workspace-card.component.html',
    styleUrls: ['./aws-workspace-card.component.scss'],
})
export class AwsWorkspaceCardComponent implements OnInit {
    public isActive: boolean = false;

    public workspace: IWorkspace = {
        name: 'Рабочая область №1',
        authorId: 1,
    };

    public author: string = 'Иванов Иван Иванович';

    constructor() {}

    ngOnInit(): void {}
}
