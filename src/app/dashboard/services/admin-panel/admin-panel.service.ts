import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { IBrigadeAdminPanel, IClaim, IWorkspace, IScreen } from '../../models/admin-panel';
import { IUser } from '../../models/events-widget';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AdminPanelService {
    private restUrl: string = `/api/user-management`;

    private defaultWorker: IUser = {
        id: null,
        login: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: 'Номер телефона',
        email: 'Электронная почта',
        brigade: {
            id: null,
            number: 'Номер бригады',
        },
        position: '',
        positionDescription: '',
        displayName: '',
    };

    public activeWorker: IUser = null;

    public activeWorker$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.defaultWorker);
    public activeWorkerScreens$: BehaviorSubject<IScreen[]> = new BehaviorSubject<IScreen[]>(null);

    public workers: IUser[] = [];

    public brigades: IBrigadeAdminPanel[] = [];

    public screenClaims: IClaim[] = [];

    constructor(private httpService: HttpClient, private configService: AppConfigService) {
        this.configService.restUrl$.subscribe((urls) => (this.restUrl = `${urls}${this.restUrl}`));
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
        const authKey: string = localStorage.getItem('authentication-token');
        const header = { Authorization: `Bearer ${authKey}` };
        return this.httpService.get<any>(url, { headers: header });
    }

    public getWorkerScreens(workerId: number): Observable<IScreen[]> {
        const url: string = `${this.restUrl}/user/${workerId}/screens`;
        const authKey: string = localStorage.getItem('authentication-token');
        const header = { Authorization: `Bearer ${authKey}` };
        return this.httpService.get<IScreen[]>(url, { headers: header });
    }

    public getAllScreenClaims(): Observable<any> {
        const url: string = `${this.restUrl}/screenclaims`;
        const authKey: string = localStorage.getItem('authentication-token');
        const header = { Authorization: `Bearer ${authKey}` };
        return this.httpService.get<any>(url, { headers: header });
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

    //#endregion

    //#region BRIGADE_METHODS

    // public removeActiveBrigade(): void {
    //     this.brigades.forEach((brigade: IBrigade) => {
    //         brigade.isActiveBrigade = false;
    //     });
    // }

    //#endregion

    public getFullName(worker: IUser): string {
        return `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
    }
}
