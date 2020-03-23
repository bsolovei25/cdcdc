import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-aws-checkbox-card',
    templateUrl: './aws-checkbox-card.component.html',
    styleUrls: ['./aws-checkbox-card.component.scss'],
})
export class AwsCheckboxCardComponent implements OnInit {
    @Input() public workerPosition: 'responsible' | 'common' = 'common';
    @Output() private checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isChecked: boolean = false;

    constructor() {}

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
