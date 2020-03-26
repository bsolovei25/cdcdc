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
    @Input() public worker: IUser = null;
    @Input() public workerUnit: IUnitEvents = null;
    @Input() private searchingFieldName: string = '';
    @Input() public isCreateNewUser: boolean = false;

    @Output() private workerData: EventEmitter<IUnitEvents> = new EventEmitter<IUnitEvents>();
    @Output() private responsible: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() private password: EventEmitter<void> = new EventEmitter<void>();

    public inputOptions: IWorkerOptionAdminPanel[];
    public selectOptions: IWorkerOptionAdminPanel[];

    constructor(private adminService: AdminPanelService) {}

    public ngOnInit(): void {
        if (this.worker) {
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
            const unit: IUnitEvents = this.worker.brigade
                ? this.adminService.getUnitByBrigadeId(this.worker.brigade.id)
                : null;
            this.selectOptions = [
                {
                    name: 'Установка',
                    value: unit ? unit.name : null,
                    key: 'unit',
                },
                {
                    name: 'Бригада',
                    value: this.worker.hasOwnProperty('brigade')
                        ? this.worker.brigade.number
                        : null,
                    key: 'brigade',
                },
            ];
        }
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
            this.worker.position = 'common';
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
            this.worker.position = 'common';
        }
        this.workerData.emit(this.workerUnit);
    }

    public onSetResponsible(event: boolean): void {
        this.responsible.emit(event);
    }

    public onSetPassword(): void {
        this.password.emit();
    }
}
