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
    @Input() isActiveCard: boolean = false;

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    constructor() {}

    ngOnInit() {}
}
