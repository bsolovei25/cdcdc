import { Injectable } from '@angular/core';
import { IWorker } from '../../models/worker';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { IBrigadeAdminPanel, IWorkerAdminPanel } from '../../models/admin-panel';
import { IBrigade } from '../../models/shift.model';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    private restUrl: string = '';

    private defaultWorker: IWorker = {
        id: null,
        name: '',
        phone: 'Номер телефона',
        email: 'Электронная почта',
        brigade: 'Номер бригады',
        accessLevel: 'Уровень доступа',
        position: '',
    };

    public activeWorker$: BehaviorSubject<IWorker> = new BehaviorSubject<IWorker>(
        this.defaultWorker
    );
    public activeBrigade$: BehaviorSubject<IBrigade> = new BehaviorSubject<IBrigade>(null);
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

    public activeBrigadeWorkers: IWorkerAdminPanel[] = [
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

    constructor(private httpService: HttpClient, private configService: AppConfigService) {
        this.configService.restUrl$.subscribe((urls) => (this.restUrl = urls.restUrl));
        this.activeBrigade$.subscribe((brigade: IBrigade) => {
            if (brigade) {
                this.getBrigadeWorkers(brigade.id);
            } else {
                this.removeActiveBrigade();
                this.removeActiveWorker();
            }
        });
    }

    //#region DATA_API

    public getAllWorkers(): Observable<any> {
        const url: string = `${this.restUrl}/api/admin`;
        return this.httpService.get(url);
    }

    public getBrigadeWorkers(brigadeId: number): Observable<any> {
        const url: string = this.restUrl;
        return this.httpService.get(url);
    }

    //#endregion

    public selectActiveWorker(workerId: number): void {
        this.activeWorker$.next(this.workers.find((item: IWorker) => item.id === workerId));
    }

    public setActiveWorker(worker: IWorker): void {
        this.activeWorker$.next(worker);
    }

    public removeActiveWorker(): void {
        this.activeBrigadeWorkers.forEach((worker: IWorkerAdminPanel) => {
            worker.isActiveWorker = false;
        });
    }

    public setActiveBrigade(brigade: IBrigade): void {
        this.activeBrigade$.next(brigade);
    }

    public removeActiveBrigade(): void {
        this.brigades.forEach((brigade: IBrigadeAdminPanel) => {
            brigade.isActiveBrigade = false;
        });
    }
}
