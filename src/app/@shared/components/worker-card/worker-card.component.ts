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
    @Input() personWorker: IWorker = null;
    @Input() isSmallCard: boolean = false;
    @Input() isActiveCard: boolean = false;

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    constructor() {}

    public ngOnInit(): void {}

    public getPersonName(): string {
        if (this.person) {
            return `${this.person.firstName} ${this.person.middleName} ${this.person.lastName}`;
        }
        if (this.personWorker) {
            return this.personWorker.name;
        }
    }

    public getPersonPosition(): string {
        if (this.person) {
            return `${this.person.positionDescription}`;
        }
        if (this.personWorker) {
            return this.personWorker.position;
        }
    }
}
