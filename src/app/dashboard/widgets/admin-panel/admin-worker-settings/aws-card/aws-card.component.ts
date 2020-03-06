import { Component, OnInit, Input } from '@angular/core';
import { IWorkerOptionAdminPanel } from '../../../../models/admin-panel';

@Component({
    selector: 'evj-aws-card',
    templateUrl: './aws-card.component.html',
    styleUrls: ['./aws-card.component.scss'],
})
export class AwsCardComponent implements OnInit {
    @Input() public option: IWorkerOptionAdminPanel = {
        value: '',
        name: '',
    };

    public isChangingOption: boolean = false;

    constructor() {}

    public ngOnInit(): void {}
}
