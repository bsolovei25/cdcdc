import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUser } from '../../../dashboard/models/EVJ/events-widget';
import { AdminPanelService } from '../../../dashboard/services/widgets/admin-panel/admin-panel.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';

@Component({
    selector: 'evj-worker-card',
    templateUrl: './worker-card.component.html',
    styleUrls: ['./worker-card.component.scss'],
})
export class WorkerCardComponent implements OnInit, OnChanges {
    @Input() public person: IUser = null;
    @Input() public isSmallCard: boolean = false;
    @Input() public isActiveCard: boolean = false;
    @Input() public position: 'responsible' | 'common'; // нужно в расписании смен

    public readonly phoneRegExp: RegExp = /[0-9]{10}/;

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    public srcCardNormal: string = 'assets/icons/widgets/admin/card-small.svg';
    public srcCardActive: string = 'assets/icons/widgets/admin/card-small-active.svg';

    public mainWorkerPath: string = 'assets/icons/widgets/admin/responsible_icon.svg';
    public mainWorkerPathDisable: string =
        'assets/icons/widgets/admin/responsible_icon-disable.svg';

    constructor(
        private adminService: AdminPanelService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) {}

    public ngOnInit(): void {}

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
        if (this.person.unitId) {
            return `${this.adminService.units.find((item) => item.id === this.person.unitId).name}`;
        }
        return 'Установка не выбрана';
    }

    public wrapLongString(str: string): string {
        let outputString: string = str;
        const maxLength: number = 30;

        if (str.length > maxLength) {
            outputString = `${str.slice(0, maxLength)}...`;
        }

        return outputString;
    }
}
