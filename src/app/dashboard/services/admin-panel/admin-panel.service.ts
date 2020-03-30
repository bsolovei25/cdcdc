import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import {
    IBrigadeAdminPanel,
    IClaim,
    IScreen,
    IWorkspace,
    IGlobalClaim,
} from '../../models/admin-panel';
import { IUser, IUnitEvents } from '../../models/events-widget';
import { IWidgets } from '../../models/widget.model';
import { fillDataShape } from '../../../@shared/common-functions';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    private restUrl: string = `/api/user-management`;
    private restFileUrl: string = '';

    private defaultWorker: IUser = {
        id: undefined,
        login: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        position: 'common',
        positionDescription: '',
        displayName: '',
    };

    public activeWorker: IUser = null;

    public allWorkers$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(null);
    public allBrigades$: BehaviorSubject<IBrigadeAdminPanel[]> = new BehaviorSubject<
        IBrigadeAdminPanel[]
    >(null);
    public activeUnitBrigades$: BehaviorSubject<IBrigadeAdminPanel[]> = new BehaviorSubject<
        IBrigadeAdminPanel[]
    >(null);
    public activeBrigade$: BehaviorSubject<IBrigadeAdminPanel> = new BehaviorSubject<
        IBrigadeAdminPanel
    >(null);

    public activeWorker$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.defaultWorker);
    public activeWorkerScreens$: BehaviorSubject<IScreen[]> = new BehaviorSubject<IScreen[]>(null);
    public activeWorkerUnit$: BehaviorSubject<IUnitEvents> = new BehaviorSubject<IUnitEvents>(null);

    public workers: IUser[] = [];

    public brigades: IBrigadeAdminPanel[] = [];

    public units: IUnitEvents[] = [];

    public screenClaims: IClaim[] = [];
    public generalClaims: IGlobalClaim[] = [];
    public specialClaims: IGlobalClaim[] = [];

    public allWidgets: IWidgets[] = [];

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.configService.restUrl$.subscribe((urls) => (this.restUrl = `${urls}${this.restUrl}`));
        this.restFileUrl = this.configService.fsUrl;
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

    // TOFIX UNUSED
    public getWorkerData(workerId: number): Observable<IUser> {
        const url: string = `${this.restUrl}/user/${workerId}`;
        return this.http.get<IUser>(url);
    }

    public editWorkerData(worker: IUser): Observable<void> {
        const url: string = `${this.restUrl}/user/${worker.id}`;
        const body: string = JSON.stringify(worker);
        return this.http.put<void>(url, body);
    }

    public createNewWorker(worker: IUser): Observable<IUser> {
        const url: string = `${this.restUrl}/user`;
        const body: string = JSON.stringify(worker);
        return this.http.post<IUser>(url, body);
    }

    public setUserResponsible(userId: number): Observable<void> {
        const url: string = `${this.restUrl}/user/${userId}/SetResponsible`;
        return this.http.post<void>(url, null);
    }

    public resetUserPassword(workerId: number): Observable<void> {
        const url: string = `${this.restUrl}/user/${workerId}/password/reset`;
        return this.http.post<void>(url, null);
    }

    // TODO
    public async pushWorkerPhoto(file: Blob): Promise<any> {
        const body: FormData = new FormData();
        const now: number = Date.now();
        body.append('uploadFile', file, `avatar_${now}.jpeg`);

        return this.http.post(this.restFileUrl, body).toPromise();
    }
    //#endregion

    //#region BRIGADES
    public getBrigades(): Observable<IBrigadeAdminPanel[]> {
        const url: string = `${this.restUrl}/brigades`;
        return this.http.get<IBrigadeAdminPanel[]>(url);
    }

    // TOFIX UNUSED
    public getBrigadeWorkers(brigadeId: number): Observable<IUser[]> {
        const url: string = `${this.restUrl}/brigade/${brigadeId}`;
        return this.http.get<IUser[]>(url);
    }
    //#endregion

    //#region CLAIMS_AND_WORKSPACES
    public getAllScreens(): Observable<IWorkspace[]> {
        const url: string = `${this.restUrl}/allscreens`;
        return this.http.get<IWorkspace[]>(url);
    }

    public getWorkerScreens(workerId: number): Observable<IScreen[]> {
        const url: string = `${this.restUrl}/user/${workerId}/screens`;
        return this.http.get<IScreen[]>(url);
    }

    public getAllScreenClaims(): Observable<IClaim[]> {
        const url: string = `${this.restUrl}/screenclaims`;
        return this.http.get<IClaim[]>(url);
    }

    public getWorkerScreenClaims(screenWorkerId: number): Observable<any> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}`;
        return this.http.get<any>(url);
    }

    public setWorkerScreenClaims(screenWorkerId: number, claims: IClaim[]): Observable<void> {
        const url: string = `${this.restUrl}/userscreen/${screenWorkerId}/claim`;
        return this.http.put<void>(url, claims);
    }

    public addWorkerScreen(
        userId: number,
        screenId: number,
        claims: IClaim[] = [{ id: 1 }]
    ): Observable<void> {
        const url: string = `${this.restUrl}/userscreen`;
        const body = {
            screen: { id: screenId },
            user: { id: userId },
            claims,
        };

        return this.http.post<void>(url, body);
    }

    public removeWorkerScreen(relationId: number): Observable<void> {
        const url: string = `${this.restUrl}/userscreen/${relationId}`;
        return this.http.delete<void>(url);
    }
    //#endregion

    //#region UNITS
    public getAllUnits(): Observable<IUnitEvents[]> {
        const url: string = `${this.restUrl}/units/all`;
        return this.http.get<IUnitEvents[]>(url);
    }

    public getUnitBrigades(unitId: number): Observable<IBrigadeAdminPanel[]> {
        const url: string = `${this.restUrl}/brigades/unit/${unitId}`;
        return this.http.get<IBrigadeAdminPanel[]>(url);
    }
    //#endregion

    //#region GENERAL_CLAIMS
    public getAllGeneralClaims(): Observable<{ data: IGlobalClaim[] }> {
        const url: string = `${this.restUrl}/claim/getavaible-claims/general`;
        return this.http.get<{ data: IGlobalClaim[] }>(url);
    }

    public getWorkerGeneralClaims(workerId: number): Observable<{ data: IGlobalClaim[] }> {
        const url: string = `${this.restUrl}/claim/user/${workerId}/getavaible-claims/general`;
        return this.http.get<{ data: IGlobalClaim[] }>(url);
    }
    //#endregion

    //#region SPECIAL_CLAIMS
    public getAllWidgets(): Observable<{ data: IWidgets[] }> {
        const url: string = `${this.restUrl}/claim/getavaible-widgets`;
        return this.http.get<{ data: IWidgets[] }>(url);
    }

    public getAllSpecialClaims(): Observable<{ data: IGlobalClaim[] }> {
        const url: string = `${this.restUrl}/claim/getavaible-claims/special`;
        return this.http.get<{ data: IGlobalClaim[] }>(url);
    }

    public getWorkerSpecialClaims(workerId: number): Observable<{ data: IGlobalClaim[] }> {
        const url: string = `${this.restUrl}/claim/user/${workerId}/getavaible-claims/special`;
        return this.http.get<{ data: IGlobalClaim[] }>(url);
    }
    //#endregion

    //#endregion

    //#region WORKER_METHODS

    public setActiveWorker(worker: IUser): void {
        this.activeWorker$.next(worker);
        if (worker.brigade) {
            this.setActiveBrigade(worker.brigade.id);
            const unit = this.getUnitByBrigadeId(worker.brigade.id);
            if (unit) {
                this.activeWorkerUnit$.next(unit);
                this.updateUnitBrigades(unit.id);
            }
        } else {
            this.activeWorkerUnit$.next(null);
            this.activeUnitBrigades$.next([]);
        }
    }

    public setDefaultActiveWorker(): void {
        const worker = fillDataShape(this.defaultWorker);
        this.activeWorker$.next(worker);
        this.activeWorkerScreens$.next([]);
        this.activeBrigade$.next(null);
        this.activeWorkerUnit$.next(null);
    }

    public setActiveBrigade(brigadeId: number): void {
        const activeBrigade = this.brigades.find((brigade) => brigade.brigadeId === brigadeId);
        if (activeBrigade) {
            this.activeBrigade$.next(activeBrigade);
        }
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
        if (worker.photoId) {
            return `${this.configService.fsUrl}/${worker.photoId}`;
        } else {
            return 'assets/icons/widgets/admin/default_avatar2.svg';
        }
    }

    // TOFIX UNUSED
    // public getFullName(worker: IUser): string {
    //     let returnedString: string = '';
    //     if (worker.lastName && worker.firstName) {
    //         returnedString = `${worker.lastName} ${worker.firstName}`;
    //     }
    //     if (worker.middleName) {
    //         returnedString = `${returnedString} ${worker.middleName}`;
    //     }
    //     return returnedString;
    // }

    public generateDisplayName(worker: IUser): string {
        let returnedString: string = '';
        if (worker.lastName && worker.firstName) {
            returnedString = `${worker.lastName} ${worker.firstName[0]}.`;
        }
        if (worker.middleName) {
            returnedString = `${returnedString} ${worker.middleName[0]}.`;
        }
        return returnedString;
    }

    //#endregion

    //#region BRIGADE_METHODS

    public getUnitByBrigadeId(brigadeId: number): IUnitEvents {
        const brigade: IBrigadeAdminPanel = this.brigades.find(
            (item: IBrigadeAdminPanel) => item.brigadeId === brigadeId
        );
        return brigade ? brigade.unit : null;
    }

    public async updateUnitBrigades(unitId: number): Promise<void> {
        try {
            const brigades = await this.getUnitBrigades(unitId).toPromise();
            this.activeUnitBrigades$.next(brigades);
        } catch (error) {
            console.error(error);
        }
    }

    //#endregion
}
