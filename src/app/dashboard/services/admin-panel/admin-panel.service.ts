import { Injectable } from '@angular/core';
import { IWorker } from '../../models/worker';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { IBrigadeAdminPanel, IWorkerAdminPanel } from '../../models/admin-panel';
import { IBrigade } from '../../models/shift.model';
import { IUser } from '../../models/events-widget';

@Injectable()
export class AdminPanelService {
    private restUrl: string = `/api/user-management`;

    // private defaultWorker: IWorker = {
    //     id: null,
    //     name: '',
    //     phone: 'Номер телефона',
    //     email: 'Электронная почта',
    //     brigade: 'Номер бригады',
    //     accessLevel: 'Уровень доступа',
    //     position: '',
    // };

    private defaultWorker: IUser = {
        id: null,
        login: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        brigade: {
            id: null,
            number: '',
        },
        position: '',
        positionDescription: '',
        displayName: '',
    };

    public activeWorker: IUser = null;

    public activeWorker$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.defaultWorker);
    public activeBrigade$: BehaviorSubject<IBrigade> = new BehaviorSubject<IBrigade>(null);

    public workers: IUser[] = [];

    public brigades: IBrigade[] = [
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
        this.configService.restUrl$.subscribe((urls) => (this.restUrl = `${urls}${this.restUrl}`));
        this.activeBrigade$.subscribe((brigade: IBrigade) => {
            if (brigade) {
                this.getBrigadeWorkers(brigade.id);
            } else {
                this.removeActiveBrigade();
                this.removeActiveWorker();
            }
        });
        this.activeWorker$.subscribe((worker: IUser) => {
            this.activeWorker = worker;
        });
    }

    //#region DATA_API

    //#region WORKERS
    public getAllWorkers(): Observable<IUser[]> {
        const url: string = `${this.restUrl}/users`;
        return this.httpService.get<IUser[]>(url);
    }

    public getWorkerData(workerId: number): Observable<any> {
        const url: string = `${this.restUrl}/user/${workerId}`;
        return this.httpService.get<any>(url);
    }

    public editWorkerData(worker: IUser): Observable<any> {
        const url: string = `${this.restUrl}/user/${worker.id}`;
        const body: string = JSON.stringify(worker);
        return this.httpService.put<any>(url, body);
    }

    public createNewWorker(worker: IUser): Observable<any> {
        const url: string = `${this.restUrl}/user`;
        const body: string = JSON.stringify(worker);
        return this.httpService.post<any>(url, body);
    }
    //#endregion

    //#region BRIGADES
    public getBrigades(): Observable<any> {
        const url: string = `${this.restUrl}/brigades`;
        return this.httpService.get<any>(url);
    }

    public getBrigadeWorkers(brigadeId: number): Observable<any> {
        const url: string = `${this.restUrl}/brigade/${brigadeId}`;
        return this.httpService.get<any>(url);
    }
    //#endregion

    //#region CLAIMS_AND_WORKSPACES
    public getAllScreens(): Observable<any> {
        const url: string = `${this.restUrl}/allscreens`;
        return this.httpService.get<any>(url);
    }

    public getWorkerScreens(workerId: number): Observable<any> {
        const url: string = `${this.restUrl}/user/${workerId}/screens`;
        return this.httpService.get<any>(url);
    }

    public getAllScreenClaims(): Observable<any> {
        const url: string = `${this.restUrl}/screenclaims`;
        return this.httpService.get<any>(url);
    }

    public getWorkerScreenClaims(screenWorkerId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}`;
        return this.httpService.get<any>(url);
    }

    public addScreenClaimToWorker(screenWorkerId: number, claimId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}/claim/${claimId}`;
        return this.httpService.post<any>(url, null);
    }

    public removeScreenClaimFromWorker(screenWorkerId: number, claimId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}/claim/${claimId}`;
        return this.httpService.delete<any>(url);
    }
    //#endregion

    // TODO RESERVE WORKER METHOD
    // public getUserByLogin(workerLogin:string):Observable<any>{
    //     const url: string = `${this.restUrl}api/user-management/user?login=${workerLogin}`;
    //     return this.httpService.get<any>(url);
    // }

    //#endregion

    //#region WORKER_METHODS

    public setActiveWorker(worker: IUser): void {
        this.activeWorker$.next(worker);
    }

    public removeActiveWorker(): void {
        this.activeBrigadeWorkers.forEach((worker: IWorkerAdminPanel) => {
            worker.isActiveWorker = false;
        });
    }

    //#endregion

    //#region BRIGADE_METHODS

    public setActiveBrigade(brigade: IBrigade): void {
        this.activeBrigade$.next(brigade);
    }

    // public removeActiveBrigade(): void {
    //     this.brigades.forEach((brigade: IBrigade) => {
    //         brigade.isActiveBrigade = false;
    //     });
    // }

    //#endregion
}
