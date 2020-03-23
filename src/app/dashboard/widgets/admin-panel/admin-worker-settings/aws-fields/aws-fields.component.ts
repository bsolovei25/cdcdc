import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkerOptionAdminPanel } from '../../../../models/admin-panel';
import { IUser, IUnitEvents } from '../../../../models/events-widget';
import { IBrigade } from '../../../../models/shift.model';
import { AdminPanelService } from '../../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-fields',
    templateUrl: './aws-fields.component.html',
    styleUrls: ['./aws-fields.component.scss'],
})
export class AwsFieldsComponent implements OnInit {
    @Input() private worker: IUser = null;
    @Input() public workerUnit: IUnitEvents = null;
    @Input() private searchingFieldName: string = '';

    @Output() public workerData: EventEmitter<IUnitEvents> = new EventEmitter<IUnitEvents>();

    public inputOptions: IWorkerOptionAdminPanel[];
    public selectOptions: IWorkerOptionAdminPanel[];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        this.inputOptions = [
            {
                name: 'Логин',
                value: this.worker.login,
                key: 'login',
            },
            {
                name: 'Фамилия',
                value: this.worker.lastName,
                key: 'lastName',
            },
            {
                name: 'Имя',
                value: this.worker.firstName,
                key: 'firstName',
            },
            {
                name: 'Отчество',
                value: this.worker.middleName,
                key: 'middleName',
            },
            {
                name: 'Должность',
                value: this.worker.positionDescription,
                key: 'positionDescription',
            },
            {
                name: 'Телефон',
                value: this.worker.phone,
                key: 'phone',
            },
            {
                name: 'Почта',
                value: this.worker.email,
                key: 'email',
            },
        ];
        this.selectOptions = [
            {
                name: 'Установка',
                value: this.worker.hasOwnProperty('brigade')
                    ? this.adminService.getUnitByBrigadeId(this.worker.brigade.id).name
                    : null,
                key: 'unit',
            },
            {
                name: 'Бригада',
                value: this.worker.hasOwnProperty('brigade') ? this.worker.brigade.number : null,
                key: 'brigade',
            },
        ];
    }

    public isValidFieldName(fieldName: string): boolean {
        return fieldName.toLowerCase().includes(this.searchingFieldName);
    }

    public setWorkerPosition(): string {
        if (this.worker.position) {
            return this.worker.position;
        }
        return 'common';
    }

    public onFieldChanging(event: IWorkerOptionAdminPanel): void {
        this.worker[event.key] = event.value;
        this.workerData.emit(this.workerUnit);
    }

    public onSelectUnit(unit: IUnitEvents): void {
        this.workerUnit = unit;
        if (unit) {
            this.adminService.updateUnitBrigades(unit.id);
        } else {
            this.onSelectBrigade(null);
        }
        this.workerData.emit(this.workerUnit);
    }

    public onSelectBrigade(brigade: IBrigade): void {
        if (brigade) {
            this.worker.brigade = { id: brigade.id, number: brigade.number.toString() };
            return;
        }

        if (this.worker.hasOwnProperty('brigade')) {
            delete this.worker.brigade;
        }
        this.workerData.emit(this.workerUnit);
    }

    public onSetResponsible(event: boolean): void {
        this.worker.position = event ? 'responsible' : 'common';
        this.workerData.emit(this.workerUnit);
    }
}
