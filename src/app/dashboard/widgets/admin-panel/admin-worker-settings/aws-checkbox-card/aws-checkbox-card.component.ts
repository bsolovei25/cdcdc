import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { WorkerPositionType } from '../../../../models/events-widget';

@Component({
    selector: 'evj-aws-checkbox-card',
    templateUrl: './aws-checkbox-card.component.html',
    styleUrls: ['./aws-checkbox-card.component.scss'],
})
export class AwsCheckboxCardComponent implements OnInit, OnChanges {
    @Input() public isCreateNewUser: boolean = false;
    @Input() public workerPosition: WorkerPositionType = 'common';
    @Output() private checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isChecked: boolean = false;

    constructor() {}

    public ngOnChanges(): void {
        if (this.workerPosition === 'responsible') {
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
    }

    public ngOnInit(): void {
        if (this.workerPosition === 'responsible') {
            this.isChecked = true;
        }
    }

    public onClick(): void {
        this.isChecked = !this.isChecked;
        this.checked.emit(this.isChecked);
    }
}
