import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';
import { IUser, IUnitEvents } from '../../../dashboard/models/events-widget';
import { AdminPanelService } from '../../../dashboard/services/admin-panel/admin-panel.service';
import { AppConfigService } from '../../../services/appConfigService';
import { AvatarConfiguratorService } from '../../../dashboard/services/avatar-configurator.service';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit, OnChanges {

    @Input() public person: IUser = null;
    @Input() public isSmallCard: boolean = false;
    @Input() public isActiveCard: boolean = false;
    @Input() public position: 'responsible' | 'common';  // нужно в расписании смен

    public readonly phoneRegExp: RegExp = /[0-9]{10}/;

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    public mainWorkerPath: string = 'assets/icons/widgets/admin/responsible_icon.svg';
    public mainWorkerPathDisable: string =
        'assets/icons/widgets/admin/responsible_icon-disable.svg';

    public personsUnit: IUnitEvents = null;

    constructor(
        private adminService: AdminPanelService,
        private avatarConfiguratorService: AvatarConfiguratorService,
    ) { }

    public ngOnInit(): void {
        if (!this.isSmallCard) {
            this.adminService.activeWorkerUnit$.subscribe((unit) => (this.personsUnit = unit));
        }
    }

    public ngOnChanges(): void {
        this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.person?.photoId);
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
        if (this.position) {
            return this.position === 'responsible';
        } else {
            return this.person.position === 'responsible';
        }
    }

    public getPersonUnit(): string {
        if (this.personsUnit) {
            return `${this.personsUnit.name}`;
        }
        return 'Установка не выбрана';
    }
}
