import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from '../../../models/worker';

@Component({
    selector: 'evj-admin-employee',
    templateUrl: './admin-employee.component.html',
    styleUrls: ['./admin-employee.component.scss'],
})
export class AdminEmployeeComponent implements OnInit {
    @Input() searchedWorker: string = '';

    public activeWorker: IWorker = null;

    private defaultWorker: IWorker = {
        id: null,
        name: '',
        phone: 'Номер телефона',
        email: 'Электронная почта',
        brigade: 'Номер бригады',
        accessLevel: 'Уровень доступа',
        position: '',
    };

    public workers: IWorker[] = [
        {
            id: 1,
            name: 'Иванов Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Ivanov@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 2,
            name: 'Петров Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Petrov@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 3,
            name: 'Сидоров Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Sidorov@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 4,
            name: 'Соколов Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Sokolov@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 5,
            name: 'Деев Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Deev@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 6,
            name: 'Пирогов Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Pirogov@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
        {
            id: 7,
            name: 'Андреев Иван Сергеевич',
            phone: '+ 7 (925) 599-99-87',
            email: 'Andreev@gazprom-neft.ru',
            brigade: 'Бригада №1',
            accessLevel: 'Высокий уровень доступа',
            position: 'Старший оператор | КИПиА',
        },
    ];

    constructor() {}

    public ngOnInit(): void {
        this.activeWorker = this.defaultWorker;
    }

    public onSelectWorker(workerId: number): void {
        this.activeWorker = this.workers.find((item: IWorker) => item.id === workerId);
    }

    public showActiveWorker(workerId: number): boolean {
        return workerId === this.activeWorker.id;
    }

    public onSearchWorker(workerName: string): boolean {
        const name: string = workerName.toLowerCase();
        return name.includes(this.searchedWorker.toLowerCase());
    }
}
