import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IWorker } from '../../../dashboard/models/worker';
import { IUser, IUnitEvents } from '../../../dashboard/models/events-widget';
import { AdminPanelService } from '../../../dashboard/services/admin-panel/admin-panel.service';
import { AppConfigService } from '../../../services/appConfigService';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit, OnChanges {
    @Input() public person: IUser = null;
    @Input() public isSmallCard: boolean = false;
    @Input() public isActiveCard: boolean = false;

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    private defaultAvatarPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    public mainWorkerPath: string = 'assets/icons/widgets/admin/responsible_icon.svg';
    public mainWorkerPathDisable: string =
        'assets/icons/widgets/admin/responsible_icon-disable.svg';

    public personsUnit: IUnitEvents = null;

    private fsUrl: string = '';

    constructor(private adminService: AdminPanelService, private configService: AppConfigService) {
        this.fsUrl = this.configService.fsUrl;
    }

    public ngOnInit(): void {
        if (!this.isSmallCard) {
            this.adminService.activeWorkerUnit$.subscribe((unit) => (this.personsUnit = unit));
        }
    }

    public ngOnChanges(): void {
        if (this.person.photoId) {
            this.photoPath = `${this.fsUrl}/${this.person.photoId}`;
        } else {
            this.photoPath = this.defaultAvatarPath;
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
            return `${this.personsUnit.name}`;
        }
        return 'Установка не выбрана';
    }
}
