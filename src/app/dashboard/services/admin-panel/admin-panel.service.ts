import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { IBrigadeAdminPanel, IClaim, IScreen } from '../../models/admin-panel';
import { IUser } from '../../models/events-widget';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    private restUrl: string = `/api/user-management`;

    private defaultWorker: IUser = {
        id: undefined,
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
        position: 'common',
        positionDescription: '',
        displayName: '',
    };

    public activeWorker: IUser = null;

    public allWorkers$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(null);
    public allBrigades$: BehaviorSubject<IBrigadeAdminPanel[]> = new BehaviorSubject<
        IBrigadeAdminPanel[]
    >(null);
    public activeBrigade$: BehaviorSubject<IBrigadeAdminPanel> = new BehaviorSubject<
        IBrigadeAdminPanel
    >(null);

    public activeWorker$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.defaultWorker);
    public activeWorkerScreens$: BehaviorSubject<IScreen[]> = new BehaviorSubject<IScreen[]>(null);

    public workers: IUser[] = [];

    public brigades: IBrigadeAdminPanel[] = [];

    public screenClaims: IClaim[] = [];

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.configService.restUrl$.subscribe((urls) => (this.restUrl = `${urls}${this.restUrl}`));
        this.activeWorker$.subscribe((worker: IUser) => {
            this.activeWorker = worker;
        });
    }

    //#region DATA_API

    //#region WORKERS
    public getAllWorkers(): Observable<IUser[]> {
        const url: string = `${this.restUrl}/users`;
        return this.http.get<IUser[]>(url);
    }

    public getWorkerData(workerId: number): Observable<any> {
        const url: string = `${this.restUrl}/user/${workerId}`;
        return this.http.get<any>(url);
    }

    public editWorkerData(worker: IUser): Observable<any> {
        const url: string = `${this.restUrl}/user/${worker.id}`;
        const body: string = JSON.stringify(worker);
        return this.http.put<any>(url, body);
    }

    public createNewWorker(worker: IUser): Observable<any> {
        const url: string = `${this.restUrl}/user`;
        const body: string = JSON.stringify(worker);
        return this.http.post<any>(url, body);
    }
    //#endregion

    //#region BRIGADES
    public getBrigades(): Observable<any> {
        const url: string = `${this.restUrl}/brigades`;
        return this.http.get<any>(url);
    }

    public getBrigadeWorkers(brigadeId: number): Observable<any> {
        const url: string = `${this.restUrl}/brigade/${brigadeId}`;
        return this.http.get<any>(url);
    }
    //#endregion

    //#region CLAIMS_AND_WORKSPACES
    public getAllScreens(): Observable<any> {
        const url: string = `${this.restUrl}/allscreens`;
        return this.http.get<any>(url);
    }

    public getWorkerScreens(workerId: number): Observable<IScreen[]> {
        const url: string = `${this.restUrl}/user/${workerId}/screens`;
        return this.http.get<IScreen[]>(url);
    }

    public getAllScreenClaims(): Observable<any> {
        const url: string = `${this.restUrl}/screenclaims`;
        return this.http.get<any>(url);
    }

    public getWorkerScreenClaims(screenWorkerId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}`;
        return this.http.get<any>(url);
    }

    public addScreenClaimToWorker(screenWorkerId: number, claimId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}/claim/${claimId}`;
        return this.http.post<any>(url, null);
    }

    public removeScreenClaimFromWorker(screenWorkerId: number, claimId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}/claim/${claimId}`;
        return this.http.delete<any>(url);
    }

    public addWorkerScreen(
        userId: number,
        screenId: number,
        maxClaimId: number = 1
    ): Observable<any> {
        const url: string = `${this.restUrl}/userscreen`;
        const body = {
            screen: { id: screenId },
            user: { id: userId },
            claims: [],
        };
        for (let i = 1; i <= maxClaimId; i++) {
            body.claims.push({ id: i });
        }
        return this.http.post<any>(url, body);
    }

    public removeWorkerScreen(relationId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${relationId}`;
        return this.http.delete<any>(url);
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

    public setDefaultActiveWorker(): void {
        this.activeWorker$.next(this.defaultWorker);
        this.activeWorkerScreens$.next([]);
    }

    public async updateAllWorkers(): Promise<void> {
        const data: IUser[] = await this.getAllWorkers().toPromise();
        this.allWorkers$.next(data);
    }

    public async updateAllBrigades(): Promise<void> {
        const data: IBrigadeAdminPanel[] = await this.getBrigades().toPromise();
        this.allBrigades$.next(data);
        this.brigades = data;
    }

    public getPhotoLink(worker: IUser): string {
        // if (worker.photoId) {
        //     return `${this.configService.fsUrl}/${worker.photoId}`;
        // } else {
        //     return 'assets/icons/widgets/admin/default_avatar.svg';
        // }
        return 'assets/icons/widgets/admin/default_avatar.svg';
    }

    //#endregion

    //#region BRIGADE_METHODS
    //#endregion

    public getFullName(worker: IUser): string {
        if (worker.lastName && worker.firstName && worker.middleName) {
            return `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
        }
        return '';
    }

    public generateDisplayName(worker: IUser): string {
        if (worker.lastName && worker.firstName && worker.middleName) {
            return `${worker.lastName} ${worker.firstName[0]}. ${worker.middleName[0]}.`;
        }
        return '';
    }
}
