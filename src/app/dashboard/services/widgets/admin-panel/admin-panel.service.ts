import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IClaim,
    IWorkspace,
    IGlobalClaim,
    IGroup,
    IUserLdapDto,
    IUserLdap,
    IUserImported,
} from '../../../models/ADMIN/admin-panel';
import { IUser, IUnitEvents, ICategory } from '../../../models/EVJ/events-widget';
import { IWidget } from '../../../models/widget.model';
import { fillDataShape } from '@shared/functions/common-functions';
import { AuthService } from '@core/service/auth.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    private restUrl: string = `/api/user-management`;
    private restUrlApi: string = `/api`;
    private restFileUrl: string = '/api/file-storage';

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
        department: '',
        isShiftWorker: false,
    };

    public allWorkers$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(null);

    public activeWorker$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.defaultWorker);
    public activeWorkerWorkspaces$: BehaviorSubject<IWorkspace[]> = new BehaviorSubject<
        IWorkspace[]
    >(null);

    public workers: IUser[] = [];

    public units: IUnitEvents[] = [];
    public eventsCategories: ICategory[] = [];

    public screenClaims: IClaim[] = [];
    public screenSpecialClaims: IGlobalClaim[] = [];
    public generalClaims: IGlobalClaim[] = [];
    public specialClaims: IGlobalClaim[] = [];

    public allWidgets: IWidget[] = [];
    public allScreens: IWorkspace[] = [];

    public settingsAlert: IAlertWindowModel = {
        isShow: false,
        questionText: '',
        acceptText: '',
        cancelText: 'Вернуться',
        acceptFunction: () => null,
        cancelFunction: () => null,
        closeFunction: () => (this.settingsAlert.isShow = false),
    };

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
        private avatarConfiguratorService: AvatarConfiguratorService,
        private authService: AuthService
    ) {
        this.restUrl = `${this.configService.restUrl}${this.restUrl}`;
        this.restUrlApi = `${this.configService.restUrl}${this.restUrlApi}`;
        this.restFileUrl = `${configService.restUrl}${this.restFileUrl}`;
    }

    //#region DATA_API

    //#region WORKERS
    public getAllWorkers(): Observable<IUser[]> {
        const url: string = `${this.restUrl}/users`;
        return this.http.get<IUser[]>(url);
    }

    public editWorkerData(worker: IUser): Observable<void> {
        const url: string = `${this.restUrl}/user/${worker.id}`;
        return this.http.put<void>(url, worker);
    }

    public createNewWorker(worker: IUser): Observable<IUser> {
        worker.password = worker?.password ? this.authService.encrypt(worker.password) : null;
        const url: string = `${this.restUrl}/user`;
        return this.http.post<IUser>(url, worker);
    }

    public resetUserPassword(workerId: number): Observable<void> {
        const url: string = `${this.restUrl}/user/${workerId}/password/reset`;
        return this.http.post<void>(url, null);
    }

    public async pushWorkerPhoto(file: Blob): Promise<string> {
        const body: FormData = new FormData();
        const now: number = Date.now();
        body.append('uploadFile', file, `avatar_${now}.jpeg`);

        return this.http.post<string>(this.restFileUrl, body).toPromise();
    }

    public async deleteWorker(workerId: number): Promise<any> {
        const url: string = `${this.restUrl}/user/${workerId}`;
        return this.http.delete(url).toPromise();
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
        const url: string = `${this.restUrlApi}/ref-book/Unit`;
        return this.http.get<IUnitEvents[]>(url);
    }
    //#endregion

    //#region Events
    public getAllEventsSubcategories(): Observable<ICategory[]> {
        const url: string = `${this.restUrlApi}/notification-reference/subcategory`;
        return this.http.get<ICategory[]>(url);
    }

    public getAllEventsCategories(): Observable<ICategory[]> {
        const url: string = `${this.restUrlApi}/notification-reference/category`;
        return this.http.get<ICategory[]>(url);
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
    public getAllWidgets(): Observable<{ data: IWidget[] }> {
        const url: string = `${this.restUrl}/claim/getavaible-widgets`;
        return this.http.get<{ data: IWidget[] }>(url);
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
    public getAllLdapUsers(
        login: string,
        skip: number = 0,
        take: number = 50,
        lastSid: string = ''
    ): Observable<IUserLdapDto[]> {
        const url: string = `${this.restUrl}/ldap/users`;
        return this.http.get<IUserLdapDto[]>(url, {
            params: { login, skip: skip.toString(), take: take.toString(), lastSid },
        });
    }

    public getLdapUser(worker: IUserLdap): Observable<IUserLdapDto> {
        const url: string = `${this.restUrl}/ldap/user/${worker.samAccountName}`;
        return this.http.get<IUserLdapDto>(url);
    }

    public importUserFromLdap(worker: IUser): Observable<IUserImported> {
        const url: string = `${this.restUrl}/ldap/user/${worker.login}/import`;
        return this.http.post<IUserImported>(url, worker);
    }

    public async updateAllLdapUsers(): Promise<void> {
        const url: string = `${this.restUrl}/ldap/update`;
        return this.http.post<void>(url, null).toPromise();
    }

    //#endregion

    //#endregion

    //#region WORKER_METHODS
    public setActiveWorker(worker: IUser): void {
        this.activeWorker$.next(worker);
    }

    public setDefaultActiveWorker(): void {
        const worker = fillDataShape(this.defaultWorker);
        this.activeWorker$.next(worker);
        this.activeWorkerWorkspaces$.next([]);
    }

    public async updateAllWorkers(): Promise<void> {
        const data: IUser[] = await this.getAllWorkers().toPromise();
        this.allWorkers$.next(data);
    }

    public getPhotoLink(worker: IUser): string {
        return this.avatarConfiguratorService.getAvatarPath(worker?.photoId);
    }

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
}
