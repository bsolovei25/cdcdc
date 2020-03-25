import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../../../models/events-widget';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-ag-group-worker-card',
    templateUrl: './ag-group-worker-card.component.html',
    styleUrls: ['./ag-group-worker-card.component.scss'],
})
export class AgGroupWorkerCardComponent implements OnInit {
    @Input() public worker: IUser = null;
    @Input() public isInBrigade: boolean = false;

    // TODO
    @Output() private changeGroup: EventEmitter<void> = new EventEmitter<void>();

    public cardSelection: SelectionModel<void> = new SelectionModel<void>();

    constructor() {}

    public ngOnInit(): void {
        if (this.isInBrigade) {
            this.cardSelection.toggle();
        }
    }

    public onClick(): void {
        this.cardSelection.toggle();
    }
}
