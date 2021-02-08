import { Injectable } from '@angular/core';
import { IUserGridItem, IScreenSettings } from '../models/user-settings.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WIDGETS, WIDGETS_LAZY } from '../../widgets/widget-map';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';
import { IParamWidgetsGrid } from '../components/widgets-grid/widgets-grid.component';
import { WidgetService } from './widget.service';
import { ClaimService } from './claim.service';
import { GridsterItem } from 'angular-gridster2';
import { SnackBarService } from './snack-bar.service';
import { OverlayService } from './overlay.service';
import { Router } from '@angular/router';
import {
    IGroupScreens
} from '../components/header-components/group-selector/group-selector.component';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    private screens$: BehaviorSubject<IScreenSettings[]> = new BehaviorSubject(null);
    public iconsList$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    public groupsList$: BehaviorSubject<IGroupScreens[]> = new BehaviorSubject(null);
    public screensShared: Observable<IScreenSettings[]> = this.screens$
        .asObservable()
        .pipe(filter((item) => item !== null));

    // Параметры активной группы
    public groupId: number;
    public groupName: string;
    public groupIconId: string;

    private restUrl: string;
    public screenId: number;
    public screenName$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    readonly projectName: string;

    private widgetsOnScreen: Map<string, string> = new Map<string, string>();

    constructor(
        private widgetService: WidgetService,
        private http: HttpClient,
        private claimService: ClaimService,
        private configService: AppConfigService,
        private snackBar: SnackBarService,
        private overlayService: OverlayService,
        private router: Router,
        private titleService: Title
    ) {
        this.restUrl = configService.restUrl;
        this.projectName = configService.projectName;
    }

    public create_UUID(): string {
        let dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            // tslint:disable-next-line:no-bitwise
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    public async getIcons(): Promise<string[]> {
        try {
            const icons = await this.http
                .get<string[]>(`${this.restUrl}/api/ref-book/IconGroup`)
                .toPromise();
            this.iconsList$.next(icons);
            return [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async addIcons(icon: File): Promise<boolean> {
        try {
            const body: FormData = new FormData();
            body.append('uploadFile', icon, icon.name);
            const newIcon = await this.http
                .post<string>(`${this.restUrl}/api/ref-book/IconGroup`, body)
                .toPromise();
            const icons = this.iconsList$.getValue();
            icons.push(newIcon);
            this.iconsList$.next(icons);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async deleteIcon(iconId: string): Promise<boolean> {
        try {
            await this.http
                .delete<string>(`${this.restUrl}/api/ref-book/IconGroup/${iconId}`)
                .toPromise();
            const icons = this.iconsList$.getValue().filter((item) => item !== iconId);
            this.iconsList$.next(icons);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public addCellByPosition(idWidget: string, nameWidget: string, param: IParamWidgetsGrid): void {
        const uniqId = this.create_UUID();
        const minItemCols = this.defWidgetSize(nameWidget)?.minItemCols ?? 6;
        const minItemRows = this.defWidgetSize(nameWidget)?.minItemRows ?? 6;
        this.widgetService.dashboard.push({
            x: param.x,
            y: param.y,
            cols:
                this.defWidgetSize(nameWidget).itemCols < minItemCols
                    ? minItemCols
                    : this.defWidgetSize(nameWidget).itemCols,
            rows:
                this.defWidgetSize(nameWidget).itemRows < minItemRows
                    ? minItemRows
                    : this.defWidgetSize(nameWidget).itemRows,
            minItemCols,
            minItemRows,
            id: idWidget,
            uniqid: uniqId,
            widgetType: nameWidget,
        });
        this.addWidgetApi(uniqId);
    }

    private addWidgetApi(uniqId: string): void {
        const updateWidget = this.save(uniqId);
        this.http
            .post(this.restUrl + '/api/user-management/widget/' + this.screenId, updateWidget)
            .subscribe(
                (ans: IUserGridItem) => {
                    this.setWidgetOnScreen(ans.widgetType, ans.uniqueId);
                },
                (error) => console.log(error)
            );
    }

    private save(uniqId: string): IUserGridItem {
        const item = this.widgetService.dashboard?.find((el) => el.uniqid === uniqId);
        return {
            widgetId: item.id,
            posX: item.x,
            posY: item.y,
            widgetType: item.widgetType,
            sizeX: item.cols,
            sizeY: item.rows,
            uniqueId: item.uniqid,
        };
    }

    private updateWidgetApi(uniqId: string): void {
        const updateWidget = this.save(uniqId);
        this.http
            .put(this.restUrl + '/api/user-management/widget/' + uniqId, updateWidget)
            .subscribe(
                (ans) => {},
                (error) => console.log(error)
            );
    }

    public updateByPosition(oldItem: GridsterItem, newItem: GridsterItem): void {
        this.updateWidgetApi(oldItem.uniqid);
    }

    public async removeItem(widgetId: string): Promise<void> {
        this.overlayService.setIsLoad(true);
        try {
            await this.http
                .delete(this.restUrl + '/api/user-management/widget/' + widgetId)
                .toPromise();
            this.widgetService.removeItemService(widgetId);
        } catch (e) {
            console.error(`widget delete error: ${e}`);
        } finally {
            this.overlayService.setIsLoad(false);
            this.widgetsOnScreen.forEach((key, val) => {
                if (key === widgetId) {
                    this.unsetWidgetOnScreen(val);
                    return;
                }
            });
        }
    }

    public async getGroups(): Promise<IGroupScreens[]> {
        try {
            const groups = await this.http
                .get<IGroupScreens[]>(`${this.restUrl}/api/user-management/screen-groups`)
                .toPromise();
            this.groupsList$.next(groups);
            return this.groupsList$.getValue();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async addGroup(group: IGroupScreens): Promise<IGroupScreens> {
        try {
            const newGroup = await this.http
                .post<IGroupScreens>(`${this.restUrl}/api/user-management/screen-group`, group)
                .toPromise();
            this.snackBar.openSnackBar('Новая группа успешно создана');
            const groups = this.groupsList$.getValue();
            groups.push(newGroup);
            this.groupsList$.next(groups);
            return newGroup;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async updateGroup(group: IGroupScreens): Promise<IGroupScreens> {
        try {
            const res = await this.http
                .put<IGroupScreens>(`${this.restUrl}/api/user-management/screen-group`, group)
                .toPromise();
            let groups = this.groupsList$.getValue();
            groups = groups.map((item) => {
                if (item.id === res.id) {
                    return res;
                }
                return item;
            });
            this.groupsList$.next(groups);
            return res;
        } catch (e) {
            console.error(e);
            return group;
        }
    }

    public async deleteGroup(groupId: number): Promise<boolean> {
        try {
            await this.http
                .delete<IGroupScreens>(
                    `${this.restUrl}/api/user-management/screen-group/${groupId}`
                )
                .toPromise();
            const groups = this.groupsList$.getValue().filter((item) => item.id !== groupId);
            this.groupsList$.next(groups);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async getScreens(id: number = null): Promise<void> {
        // "запоминание" активной группы
        sessionStorage.setItem('userScreenGroupId', id ? id.toString() : undefined);
        localStorage.setItem('userScreenGroupId', id ? id.toString() : undefined);

        try {
            let params: HttpParams = new HttpParams();
            if (id) {
                params = params.set('groupId', id.toString());
            }
            const data = await this.http
                .get<IScreenSettings[]>(`${this.restUrl}/api/user-management/screens/group`, {
                    params,
                })
                .toPromise();

            const search = data.find((item) => item.id === this.screenId);
            if (!data.length) {
                this.screenId = undefined;
                this.screenName$.next(undefined);
            } else if (!search) {
                this.screenId = data[0]?.id;
            }
            this.screens$.next(data);
        } catch (e) {
            console.log('Error: could not get screen!');
        }
    }

    private loadScreenAsync(id: number, loadDefault: boolean): Observable<any> {
        const dataScreen = this.screens$.getValue();
        if (dataScreen?.length > 0) {
            return this.http.get(this.restUrl + '/api/user-management/screen/' + id).pipe(
                catchError((err) => {
                    if ((err.status === 404 || err.status === 403) && loadDefault) {
                        return this.loadScreenAsync(dataScreen[0].id, false);
                    }
                    return throwError(err);
                })
            );
        } else {
            return null;
        }
    }

    public loadScreen(id: number): Subscription {
        if (id) {
            localStorage.setItem('screenid', id.toString());
            sessionStorage.setItem('screenid', id.toString());
            this.widgetService.dashboard = [];
            this.claimService.setClaimsByScreen(null);
            return this.loadScreenAsync(id, true).subscribe((item: IScreenSettings) => {
                this.router.navigate([], {
                    queryParams: { screenId: item.id },
                    queryParamsHandling: 'merge',
                });
                this.claimService.setClaimsByScreen(item.claims);
                this.screenId = item.id;
                this.screenName$.next(item.screenName);
                this.clearWidgetsOnScreen();
                this.widgetService.dashboard = item.widgets.map((widget) => {
                    this.setWidgetOnScreen(widget.widgetType, widget.uniqueId);
                    const minItemCols = this.defWidgetSize(widget.widgetType)?.minItemCols ?? 6;
                    const minItemRows = this.defWidgetSize(widget.widgetType)?.minItemRows ?? 6;
                    return {
                        x: widget.posX,
                        y: widget.posY,
                        cols: widget.sizeX < minItemCols ? minItemCols : widget.sizeX,
                        rows: widget.sizeY < minItemRows ? minItemRows : widget.sizeY,
                        minItemCols,
                        minItemRows,
                        id: widget.widgetId,
                        widgetType: widget.widgetType,
                        uniqid: widget.uniqueId,
                    };
                });
                this.setTitle(`${this.projectName} - ${this.screenName$.getValue()}`);
            });
        } else {
            this.screenId = undefined;
            this.screenName$.next(undefined);
            this.widgetService.dashboard = [];
            this.claimService.setClaimsByScreen(null);
            this.router.navigate([], {
                queryParams: { screenId: undefined },
                queryParamsHandling: 'merge',
            });
        }
    }

    public async pushScreen(screenName: string): Promise<void> {
        const userScreen: IScreenSettings = {
            id: null,
            screenName,
            user: null,
            updateScreen: null,
            widgets: null,
            // экран создается в привязке к активной группе
            userScreenGroupName: this.groupName,
            userScreenGroupId: this.groupId,
        };
        try {
            const data: IScreenSettings = await this.http
                .post<IScreenSettings>(this.restUrl + '/api/user-management/screen', userScreen)
                .toPromise();
            console.log('screen id');
            this.screenId = data?.id ?? this.screenId;
            this.getScreens(this.groupId);
        } catch (error) {
            console.log(error);
        }
    }

    public async loadScreenByWidget(widgetType: string): Promise<void> {
        const screenId = await this.getScreenByWidgetType(widgetType);
        if (!screenId) {
            throwError('wrong screen id');
        }
        this.loadScreen(screenId);
    }

    public deleteScreen(id: number): Subscription {
        return this.http.delete(this.restUrl + '/api/user-management/screen/' + id).subscribe(
            (ans) => {
                if (this.screenId === Number(id)) {
                    this.screenId = undefined;
                }
                this.snackBar.openSnackBar('Экран успешно удален');
                this.getScreens(this.groupId);
            },
            (error) => console.log(error)
        );
    }

    public updateScreen(screen: IScreenSettings): Subscription {
        return this.http
            .put(`${this.restUrl}/api/user-management/screen/${screen.id}`, screen)
            .subscribe(
                (ans) => {
                    this.snackBar.openSnackBar('Экран успешно изменен');
                    this.getScreens(this.groupId);
                },
                (error) => console.log(error)
            );
    }

    public clearScreens(): void {
        this.screens$.next(null);
    }

    public isWidgetAvailableOnScreen(widgetType: string): boolean {
        return this.widgetsOnScreen.has(widgetType);
    }

    private setWidgetOnScreen(widgetType: string, widgetId: string): void {
        this.widgetsOnScreen.set(widgetType, widgetId);
    }

    private unsetWidgetOnScreen(widgetType: string): void {
        this.widgetsOnScreen.delete(widgetType);
    }

    private clearWidgetsOnScreen(): void {
        this.widgetsOnScreen.clear();
    }

    private async getScreenByWidgetType(widgetType: string): Promise<number> {
        const screen = await this.http
            .get<IScreenSettings>(
                `${this.restUrl}` + `/api/user-management/screens/widget/${widgetType}`
            )
            .toPromise();
        return screen?.id ?? null;
    }

    private defWidgetSize = (widgetType: string): any => {
        return WIDGETS_LAZY[widgetType] ?? WIDGETS[widgetType];
    }

    public setTitle(newTitle: string): void {
        this.titleService.setTitle(newTitle);
    }
}
