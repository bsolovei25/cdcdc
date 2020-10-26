import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../../../../dashboard/models/EVJ/events-widget';

@Component({
    selector: 'evj-ag-group-worker-card',
    templateUrl: './ag-group-worker-card.component.html',
    styleUrls: ['./ag-group-worker-card.component.scss'],
})
export class AgGroupWorkerCardComponent implements OnInit, OnChanges {
    @Input() public worker: IUser = null;
    @Input() public isInGroup: boolean = false;

    @Output() private changeGroup: EventEmitter<boolean> = new EventEmitter<boolean>();

    public cardSelection: SelectionModel<void> = new SelectionModel<void>();

    constructor() {}

    public ngOnChanges(): void {
        this.cardSelection.clear();
        if (this.isInGroup) {
            this.cardSelection.select(null);
        }
    }

    public ngOnInit(): void {}

    public onClick(): void {
        this.cardSelection.toggle();
        this.changeGroup.emit(!this.isInGroup);
    }
}
