import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import {
    IBrigadeAdminPanel,
    IClaim,
    IWorkspace,
    IGlobalClaim,
    IGroup,
    IUserLdapDto,
    IUserLdap,
    IUserImported,
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

    public defaultWorker: IUser = {
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
    public activeWorkerUnit$: BehaviorSubject<IUnitEvents> = new BehaviorSubject<IUnitEvents>(null);
    public activeWorkerWorkspaces$: BehaviorSubject<IWorkspace[]> = new BehaviorSubject<
        IWorkspace[]
    >(null);

    public workers: IUser[] = [];

    public brigades: IBrigadeAdminPanel[] = [];

    public unitsWithBrigades: IUnitEvents[] = [];
    public units: IUnitEvents[] = [];

    public screenClaims: IClaim[] = [];
    public screenSpecialClaims: IGlobalClaim[] = [];
    public generalClaims: IGlobalClaim[] = [];
    public specialClaims: IGlobalClaim[] = [];

    public allWidgets: IWidgets[] = [];
    public allScreens: IWorkspace[] = [];

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

    //#region WORKSPACES
    public getAllScreens(): Observable<IWorkspace[]> {
        const url: string = `${this.restUrl}/allscreens`;
        return this.http.get<IWorkspace[]>(url);
    }

    public getAllSpecialScreenClaims(): Observable<{ data: IGlobalClaim[] }> {
        const url: string = `${this.restUrl}/screen/admin/getavaible-claims`;
        return this.http.get<{ data: IGlobalClaim[] }>(url);
    }

    public getAllWorkerScreenClaims(workerId: number): Observable<{ data: IWorkspace[] }> {
        const url: string = `${this.restUrl}/screen/admin/screens/${workerId}/user`;
        return this.http.get<{ data: IWorkspace[] }>(url);
    }

    public getAllGroupScreenClaims(groupId: number): Observable<{ data: IWorkspace[] }> {
        const url: string = `${this.restUrl}/screen/admin/screens/${groupId}/role`;
        return this.http.get<{ data: IWorkspace[] }>(url);
    }
    //#endregion

    //#region UNITS
    public getAllUnits(): Observable<IUnitEvents[]> {
        const url: string = 'http://deploy.funcoff.club:6555/api/ref-book/Unit';
        return this.http.get<IUnitEvents[]>(url);
    }

    public getAllUnitsWithBrigades(): Observable<IUnitEvents[]> {
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

    //#region GROUPS
    // TODO
    public getAllGroups(): Observable<IGroup[]> {
        const url: string = `${this.restUrl}/roles`;
        return this.http.get<IGroup[]>(url);
    }

    public createNewGroup(group: IGroup): Observable<void> {
        const url: string = `${this.restUrl}/roles`;
        return this.http.post<void>(url, group);
    }

    public editGroup(group: IGroup): Observable<void> {
        const url: string = `${this.restUrl}/roles`;
        return this.http.put<void>(url, group);
    }

    public getGroupById(groupId: number): Observable<IGroup> {
        const url: string = `${this.restUrl}/roles/${groupId}`;
        return this.http.get<IGroup>(url);
    }

    public deleteGroupById(groupId: number): Observable<void> {
        const url: string = `${this.restUrl}/roles/${groupId}`;
        return this.http.delete<void>(url);
    }
    //#endregion

    //#region LDAP
    public getAllLdapUsers(): Observable<IUserLdapDto[]> {
        const url: string = `${this.restUrl}/ldap/users`;
        return this.http.get<IUserLdapDto[]>(url);
    }

    public getLdapUser(worker: IUserLdap): Observable<IUserLdapDto> {
        const url: string = `${this.restUrl}/ldap/user/${worker.samAccountName}`;
        return this.http.get<IUserLdapDto>(url);
    }

    public importUserFromLdap(worker: IUser): Observable<IUserImported> {
        const url: string = `${this.restUrl}/ldap/user/${worker.login}/import`;
        return this.http.post<IUserImported>(url, worker);
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
        this.activeWorkerWorkspaces$.next([]);
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
