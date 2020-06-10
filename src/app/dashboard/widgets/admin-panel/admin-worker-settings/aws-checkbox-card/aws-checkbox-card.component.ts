import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { WorkerPositionType } from '../../../../models/events-widget';

@Component({
    selector: 'evj-aws-checkbox-card',
    templateUrl: './aws-checkbox-card.component.html',
    styleUrls: ['./aws-checkbox-card.component.scss'],
})
export class AwsCheckboxCardComponent {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public isChecked: boolean = false;
    @Output() private isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    onClick(): void {
        this.isCheckedChange.emit(!this.isChecked);
    }
}
