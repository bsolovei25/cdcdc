import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';
import { IUser } from '../../../dashboard/models/events-widget';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit {
    @Input() public person: IUser = null;
    @Input() public isSmallCard: boolean = false;
    @Input() public isActiveCard: boolean = false;
    @Input() public photoPath: string = '';

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    public mainWorkerPath: string = 'assets/icons/widgets/admin/responsible_icon.svg';
    public mainWorkerPathDisable: string =
        'assets/icons/widgets/admin/responsible_icon-disable.svg';

    constructor() {}

    public ngOnInit(): void {}

    public getPersonName(): string {
        if (this.person) {
            return `${this.person.firstName} ${this.person.middleName} ${this.person.lastName}`;
        }
    }

    public getPersonPosition(): string {
        if (this.person) {
            return `${this.person.positionDescription}`;
        }
    }

    public getPersonBrigade(): string {
        if (this.person.hasOwnProperty('brigade')) {
            return `Бригада №${this.person.brigade.number}`;
        }
        return `Нет бригады`;
    }

    public checkPersonResponsibility(): boolean {
        return this.person.position === 'responsible';
    }
}
