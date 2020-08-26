import { Injectable } from '@angular/core';
import { IUserGridItem, IScreenSettings } from '../models/user-settings.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WIDGETS, WIDGETS_LAZY } from '../components/widgets-grid/widget-map';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';
import { IParamWidgetsGrid } from '../components/widgets-grid/widgets-grid.component';
import { WidgetService } from './widget.service';
import { ClaimService } from './claim.service';
import { GridsterItem } from 'angular-gridster2';
import { SnackBarService } from './snack-bar.service';
import { OverlayService } from './overlay.service';
import { Router } from '@angular/router';
import { IGroupScreens } from '../components/group-selector/group-selector.component';
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    private _screens$: BehaviorSubject<IScreenSettings[]> = new BehaviorSubject(null);
    public screens$: Observable<IScreenSettings[]> = this._screens$
        .asObservable()
        .pipe(filter((item) => item !== null));

    // Параметры активной группы
    public groupId: number;
    public groupName: string;

    private restUrl: string;

    public ScreenId: number;
    public ScreenName: string;

    constructor(
        private widgetService: WidgetService,
        private http: HttpClient,
        private claimService: ClaimService,
        private configService: AppConfigService,
        private snackBar: SnackBarService,
        private overlayService: OverlayService,
        private router: Router
    ) {
        this.restUrl = configService.restUrl;
    }

    public create_UUID(): string {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    public addCellByPosition(idWidget: string, nameWidget: string, param: IParamWidgetsGrid): void {
        const uniqId = this.create_UUID();
        const minItemCols = this.defWidgetSize(nameWidget)?.minItemCols ?? 6;
        const minItemRows = this.defWidgetSize(nameWidget)?.minItemRows ?? 6;
        console.log(minItemCols, minItemRows);
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
            widgetType: nameWidget
        });
        this.addWidgetApi(uniqId);
    }

    private addWidgetApi(uniqId: string): void {
        const updateWidget = this.save(uniqId);
        this.http
            .post(this.restUrl + '/api/user-management/widget/' + this.ScreenId, updateWidget)
            .subscribe(
                (ans) => {
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
            uniqueId: item.uniqid
        };
    }

    private updateWidgetApi(uniqId: string): void {
        const updateWidget = this.save(uniqId);
        this.http
            .put(this.restUrl + '/api/user-management/widget/' + uniqId, updateWidget)
            .subscribe(
                (ans) => {
                },
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
        }
    }

    public async GetGroups(): Promise<IGroupScreens[]> {
        try {
            return await this.http
                .get<IGroupScreens[]>(`${this.restUrl}/api/user-management/screen-groups`)
                .toPromise();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async AddGroup(group: IGroupScreens): Promise<IGroupScreens> {
        try {
            return await this.http
                .post<IGroupScreens>(`${this.restUrl}/api/user-management/screen-group`, group)
                .toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async UpdateGroup(group: IGroupScreens): Promise<IGroupScreens> {
        try {
            return await this.http
                .put<IGroupScreens>(`${this.restUrl}/api/user-management/screen-group`, group)
                .toPromise();
        } catch (e) {
            console.error(e);
            return group;
        }
    }

    public async DeleteGroup(groupId: number): Promise<boolean> {
        try {
            await this.http
                .delete<IGroupScreens>(
                    `${this.restUrl}/api/user-management/screen-group/${groupId}`
                )
                .toPromise();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async GetScreens(id: number = null): Promise<void> {
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
                    params
                })
                .toPromise();
            if (!this.ScreenId && data[0]) {
                this.ScreenId = data[0]?.id;
            }
            this._screens$.next(data);
            console.log(this._screens$.getValue());
        } catch (e) {
            console.log('Error: could not get screen!');
        }
    }

    private LoadScreenAsync(id: number, loadDefault: boolean): Observable<any> {
        const dataScreen = this._screens$.getValue();
        if (dataScreen?.length > 0) {
            return this.http.get(this.restUrl + '/api/user-management/screen/' + id).pipe(
                catchError((err) => {
                    if ((err.status === 404 || err.status === 403) && loadDefault) {
                        return this.LoadScreenAsync(dataScreen[0].id, false);
                    }
                    return throwError(err);
                })
            );
        } else {
            return null;
        }
    }

    public LoadScreen(id: number): Subscription {
        localStorage.setItem('screenid', id.toString());
        sessionStorage.setItem('screenid', id.toString());
        this.widgetService.dashboard = [];
        this.claimService.setClaimsByScreen(null);
        return this.LoadScreenAsync(id, true).subscribe((item: IScreenSettings) => {
            console.log(item);
            this.router.navigate([], {
                queryParams: { screenId: item.id },
                queryParamsHandling: 'merge'
            });
            this.claimService.setClaimsByScreen(item.claims);
            this.ScreenId = item.id;
            this.ScreenName = item.screenName;
            this.widgetService.dashboard = item.widgets.map((widget) => {
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
                    uniqid: widget.uniqueId
                };
            });
        });
    }

    public async PushScreen(screenName: string): Promise<void> {
        const userScreen: IScreenSettings = {
            id: null,
            screenName,
            user: null,
            updateScreen: null,
            widgets: null,
            // экран создается в привязке к активной группе
            userScreenGroupName: this.groupName,
            userScreenGroupId: this.groupId
        };
        try {
            const data: IScreenSettings = await this.http
                .post<IScreenSettings>(this.restUrl + '/api/user-management/screen', userScreen)
                .toPromise();
            console.log('screen id');
            console.log(data);
            this.ScreenId = data?.id ?? this.ScreenId;
            this.GetScreens(this.groupId);
        } catch (error) {
            console.log(error);
        }
    }

    public async LoadScreenByWidget(widgetType: string): Promise<void> {
        const screenId = await this.getScreenByWidgetType(widgetType);
        console.log(screenId);
        if (!screenId) {
            throwError('wrong screen id');
        }
        this.LoadScreen(screenId);
    }

    public deleteScreen(id: number): Subscription {
        return this.http.delete(this.restUrl + '/api/user-management/screen/' + id).subscribe(
            (ans) => {
                if (this.ScreenId === Number(id)) {
                    this.ScreenId = undefined;
                }
                this.snackBar.openSnackBar('Экран успешно удален');
                this.GetScreens(this.groupId);
            },
            (error) => console.log(error)
        );
    }

    public updateScreen(id: number, name: string): Subscription {
        const userScreen: IScreenSettings = {
            id,
            screenName: name,
            user: null,
            updateScreen: null,
            widgets: null
        };
        return this.http
            .put(this.restUrl + '/api/user-management/screen/' + id, userScreen)
            .subscribe(
                (ans) => {
                    this.snackBar.openSnackBar('Экран успешно изменен');
                    this.GetScreens(this.groupId);
                },
                (error) => console.log(error)
            );
    }

    public clearScreens(): void {
        this._screens$.next(null);
    }

    private async getScreenByWidgetType(widgetType: string): Promise<number> {
        const screen = await this.http
            .get<IScreenSettings>(
                `${this.restUrl}` + `/api/user-management/screens/widget/${widgetType}`
            )
            .toPromise();
        return screen?.id ?? null;
    }

    private defWidgetSize(widgetType: string): any {
        return WIDGETS_LAZY[widgetType] ?? WIDGETS[widgetType];
    }
}
