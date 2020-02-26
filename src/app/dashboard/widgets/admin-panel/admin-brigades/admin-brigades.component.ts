import { Component, OnInit } from '@angular/core';
import { IWorker } from '../../../models/worker';
import { IBrigadeAdminPanel, IWorkerAdminPanel } from '../../../models/admin-panel';
import { threadId } from 'worker_threads';

@Component({
    selector: 'evj-admin-brigades',
    templateUrl: './admin-brigades.component.html',
    styleUrls: ['./admin-brigades.component.scss'],
})
export class AdminBrigadesComponent implements OnInit {
    public brigades: IBrigadeAdminPanel[] = [
        {
            isActiveBrigade: false,
            brigade: {
                id: 1,
                number: 0,
            },
        },
        {
            isActiveBrigade: false,
            brigade: {
                id: 2,
                number: 1,
            },
        },
        {
            isActiveBrigade: false,
            brigade: {
                id: 3,
                number: 2,
            },
        },
        {
            isActiveBrigade: false,
            brigade: {
                id: 4,
                number: 3,
            },
        },
        {
            isActiveBrigade: false,
            brigade: {
                id: 5,
                number: 4,
            },
        },
        {
            isActiveBrigade: false,
            brigade: {
                id: 6,
                number: 5,
            },
        },
    ];

    public workers: IWorkerAdminPanel[] = [
        {
            isActiveWorker: false,
            worker: {
                id: 1,
                name: 'Иванов Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Ivanov@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 2,
                name: 'Петров Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Petrov@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 3,
                name: 'Сидоров Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Sidorov@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 4,
                name: 'Соколов Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Sokolov@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 5,
                name: 'Деев Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Deev@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 6,
                name: 'Пирогов Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Pirogov@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
        {
            isActiveWorker: false,
            worker: {
                id: 7,
                name: 'Андреев Иван Сергеевич',
                phone: '+ 7 (925) 599-99-87',
                email: 'Andreev@gazprom-neft.ru',
                brigade: '1',
                accessLevel: 'Высокий уровень доступа',
                position: 'Старший оператор | КИПиА',
            },
        },
    ];

    constructor() {}

    public ngOnInit(): void {
        this.brigades[0].isActiveBrigade = true;
        this.workers[0].isActiveWorker = true;
    }

    public setActiveBrigade(brigade: IBrigadeAdminPanel): void {
        this.brigades.forEach((item) => {
            if (item.brigade.id === brigade.brigade.id) {
                item.isActiveBrigade = true;
            } else {
                item.isActiveBrigade = false;
            }
        });
    }

    public setActiveWorker(workerId: number): void {
        this.workers.forEach((item) => {
            if (item.worker.id === workerId) {
                item.isActiveWorker = true;
            } else {
                item.isActiveWorker = false;
            }
        });
    }
}
