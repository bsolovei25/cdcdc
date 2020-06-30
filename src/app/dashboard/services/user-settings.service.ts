import { Injectable } from '@angular/core';
import { IUserGridItem, IScreenSettings } from '../models/user-settings.model';
import { HttpClient } from '@angular/common/http';
import { WIDGETS, WIDGETS_LAZY } from '../components/widgets-grid/widget-map';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';
import { IParamWidgetsGrid } from '../components/widgets-grid/widgets-grid.component';
import { WidgetService } from './widget.service';
import { ClaimService } from './claim.service';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { SnackBarService } from './snack-bar.service';
import { OverlayService } from './overlay.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    private _screens$: BehaviorSubject<IScreenSettings[]> = new BehaviorSubject(null);
    public screens$: Observable<IScreenSettings[]> = this._screens$
        .asObservable()
        .pipe(filter((item) => item !== null));

    private restUrl: string;

    public ScreenId: number;
    public ScreenName: string;
    public widgetInfo: IUserGridItem;

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
            widgetType: nameWidget,
        });
        this.addWidgetApi(uniqId);
    }

    private addWidgetApi(uniqId: string): void {
        this.save(uniqId);
        const updateWidget = this.widgetInfo;
        this.http
            .post(this.restUrl + '/api/user-management/widget/' + this.ScreenId, updateWidget)
            .subscribe(
                (ans) => {},
                (error) => console.log(error)
            );
    }

    private save(uniqId: string): void {
        const item = this.widgetService.dashboard?.find((el) => el.uniqid === uniqId);
        this.widgetInfo = {
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
        this.save(uniqId);
        const updateWidget = this.widgetInfo;
        this.http
            .put(this.restUrl + '/api/user-management/widget/' + uniqId, updateWidget)
            .subscribe(
                (ans) => {},
                (error) => console.log(error)
            );
    }

    public updateByPosition(oldItem: GridsterItem, newItem: GridsterItem): void {
        const item = this.widgetService.dashboard?.find((el) => el.uniqId === oldItem.uniqId);
        item.x = newItem.x;
        item.y = newItem.y;
        item.rows = newItem.rows;
        item.cols = newItem.cols;
        item.minItemCols = newItem.minItemCols;
        item.maxItemRows = newItem.maxItemRows;
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

    public GetScreens(): void {
        try {
            this.http
                .get<IScreenSettings[]>(this.restUrl + '/api/user-management/screens')
                .subscribe((data) => {
                    if (!this.ScreenId && data[0]) {
                        this.ScreenId = data[0].id;
                    }
                    this._screens$.next(data);
                });
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
            this.router.navigate([], { queryParams: { screenId: item.id } });
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
                    uniqid: widget.uniqueId,
                };
            });
            console.log(this.widgetService.dashboard);
        });
    }

    public PushScreen(nameWidget: string): Subscription {
        const userScreen: IScreenSettings = {
            id: null,
            screenName: nameWidget,
            user: null,
            updateScreen: null,
            widgets: null,
        };
        return this.http.post(this.restUrl + '/api/user-management/screen', userScreen).subscribe(
            (data: { id: number; name: string }) => {
                console.log('screen id');
                console.log(data);
                this.ScreenId = data?.id ?? this.ScreenId;
                this.GetScreens();
            },
            (error) => console.log(error)
        );
    }

    public deleteScreen(id: number): Subscription {
        return this.http.delete(this.restUrl + '/api/user-management/screen/' + id).subscribe(
            (ans) => {
                if (this.ScreenId === Number(id)) {
                    this.ScreenId = undefined;
                }
                this.snackBar.openSnackBar('Экран успешно удален');
                this.GetScreens();
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
            widgets: null,
        };
        return this.http
            .put(this.restUrl + '/api/user-management/screen/' + id, userScreen)
            .subscribe(
                (ans) => {
                    this.snackBar.openSnackBar('Экран успешно изменен');
                    this.GetScreens();
                },
                (error) => console.log(error)
            );
    }

    public clearScreens(): void {
        this._screens$.next(null);
    }

    private defWidgetSize(widgetType: string): any {
        return WIDGETS_LAZY[widgetType] ?? WIDGETS[widgetType];
    }
}
