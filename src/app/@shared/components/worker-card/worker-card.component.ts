import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';
import { IUser } from '../../../dashboard/models/events-widget';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit {
    @Input() person: IUser = null;
    @Input() isSmallCard: boolean = false;
    @Input() active: boolean = true;

    constructor() {}

    ngOnInit() {}
}
