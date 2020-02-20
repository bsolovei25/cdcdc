import { Component, OnInit } from '@angular/core';
import { Brigade } from '../../../models/shift.model';
import { IWorker } from '../../../models/worker';

@Component({
    selector: 'evj-admin-brigades',
    templateUrl: './admin-brigades.component.html',
    styleUrls: ['./admin-brigades.component.scss'],
})
export class AdminBrigadesComponent implements OnInit {
    public brigades: Brigade[] = [
        {
            id: 1,
            number: 0,
        },
        {
            id: 2,
            number: 1,
        },
        {
            id: 3,
            number: 2,
        },
        {
            id: 4,
            number: 3,
        },
        {
            id: 5,
            number: 4,
        },
        {
            id: 6,
            number: 5,
        },
        {
            id: 7,
            number: 6,
        },
    ];

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

    ngOnInit(): void {}
}
