import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit {
    @Input() person: IWorker = null;
    @Input() isSmallCard: boolean = false;

    constructor() {}

    ngOnInit() {}
}
