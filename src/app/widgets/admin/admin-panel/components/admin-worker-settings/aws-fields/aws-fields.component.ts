import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser, IUnitEvents } from '../../../../../../dashboard/models/EVJ/events-widget';
import { IWorkerOptionAdminPanel } from '../../../../../../dashboard/models/ADMIN/admin-panel';
import { AdminPanelService } from '../../../../../../dashboard/services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-aws-fields',
    templateUrl: './aws-fields.component.html',
    styleUrls: ['./aws-fields.component.scss'],
})
export class AwsFieldsComponent implements OnInit {
    @Input() public worker: IUser = null;
    @Input() private searchingFieldName: string = '';
    @Input() public isCreateNewUser: boolean = false;
    @Input() public isImportNewWorker: boolean = false;

    @Output() private workerData: EventEmitter<void> = new EventEmitter<void>();
    @Output() private password: EventEmitter<boolean> = new EventEmitter<boolean>();

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
                    name: 'Отдел',
                    value: this.worker.department,
                    key: 'department',
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
            const unit: IUnitEvents = this.adminService.units.find(
                (item) => item.id === this.worker.unitId
            );
            this.selectOptions = [
                {
                    name: 'Установка',
                    value: unit ? unit.name : null,
                    key: 'unit',
                },
            ];
        }
    }

    public isValidFieldName(fieldName: string): boolean {
        return fieldName.toLowerCase().includes(this.searchingFieldName.toLowerCase());
    }

    public isDisabledField(fieldKey: string): boolean {
        if (this.isImportNewWorker) {
            switch (fieldKey) {
                case 'login':
                case 'firstName':
                case 'lastName':
                case 'email':
                case 'department':
                case 'positionDescription':
                    return true;
            }
        } else if (!this.isCreateNewUser) {
            switch (fieldKey) {
                case 'login':
                    return true;
            }
        }
        return false;
    }

    public onFieldChanging(event: IWorkerOptionAdminPanel): void {
        this.worker[event.key] = event.value;
        this.workerData.emit();
    }

    public onSelectUnit(unit: IUnitEvents): void {
        this.worker.unitId = unit?.id ?? null;
        this.workerData.emit();
    }

    public textPasswordButton(): string {
        return this.isCreateNewUser ? 'Добавить пароль' : 'Сбросить пароль';
    }

    public onSetPassword(): void {
        if (this.isCreateNewUser || (this.isImportNewWorker && !this.worker.id)) {
            this.password.emit(false);
        } else {
            this.password.emit(true);
        }
    }

    public onSetShift(isShiftWorker: boolean): void {
        this.worker.isShiftWorker = isShiftWorker;
        this.workerData.emit();
    }
}
