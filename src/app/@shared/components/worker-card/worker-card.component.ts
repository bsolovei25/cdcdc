import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';
import { IUser, IUnitEvents } from '../../../dashboard/models/events-widget';
import { AdminPanelService } from '../../../dashboard/services/admin-panel/admin-panel.service';

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

    public personsUnit: IUnitEvents = null;

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (!this.isSmallCard) {
            this.adminService.activeWorkerUnit$.subscribe((unit) => (this.personsUnit = unit));
        }
    }

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
            return `Бригада ${this.person.brigade.number}`;
        }
        return `Нет бригады`;
    }

    public checkPersonResponsibility(): boolean {
        return this.person.position === 'responsible';
    }

    public getPersonUnit(): string {
        if (this.personsUnit) {
            return `${this.personsUnit.name} | `;
        }
        return '';
    }
}
