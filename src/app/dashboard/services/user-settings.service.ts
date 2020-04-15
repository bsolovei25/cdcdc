import { Injectable } from '@angular/core';
import { IUserGridItem, IScreenSettings } from '../models/user-settings.model';
import { HttpClient } from '@angular/common/http';
import { WIDGETS } from '../components/new-widgets-grid/widget-map';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';
import { IParamWidgetsGrid } from '../components/new-widgets-grid/new-widgets-grid.component';
import { WidgetService } from './widget.service';
import { ClaimService } from './claim.service';
import { GridsterItem } from 'angular-gridster2';

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
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
        localStorage.getItem('screen');
    }

    // TODO WTF?! - function ??? var ??? - answer: copypast google
    public create_UUID(): string {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    public addCellByPosition(idWidget: string, nameWidget: string, param: IParamWidgetsGrid): void {
        const uniqId = this.create_UUID();
        const minItemCols = WIDGETS[nameWidget]?.minItemCols ?? 6;
        const minItemRows = WIDGETS[nameWidget]?.minItemRows ?? 6;
        console.log(minItemCols, minItemRows);
        this.widgetService.dashboard.push({
            x: param.x,
            y: param.y,
            cols: WIDGETS[nameWidget].itemCols < minItemCols
                ? minItemCols
                : WIDGETS[nameWidget].itemCols,
            rows: WIDGETS[nameWidget].itemRows < minItemRows
                ? minItemRows
                : WIDGETS[nameWidget].itemRows,
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
        const item = this.widgetService.dashboard?.find((el) =>
            el.uniqid === uniqId
        );
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
        const item = this.widgetService.dashboard?.find(el => el.uniqId === oldItem.uniqId);
        item.x = newItem.x;
        item.y = newItem.y;
        item.rows = newItem.rows;
        item.cols = newItem.cols;
        item.minItemCols = newItem.minItemCols;
        item.maxItemRows = newItem.maxItemRows;
        this.updateWidgetApi(oldItem.uniqid);
    }

    public async removeItem(widgetId: string): Promise<any> {
        return await this.http.delete(this.restUrl + '/api/user-management/widget/' + widgetId)
            .toPromise();
    }

    public GetScreens(): void {
        try {
            this.http
                .get<IScreenSettings[]>(this.restUrl + '/api/user-management/screens')
                .subscribe((data) => {
                    this._screens$.next(data);
                    if (!this.ScreenId && data[0]) {
                        this.ScreenId = data[0].id;
                    }
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
                    if (
                        err.status === 404 &&
                        loadDefault
                    ) {
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
        this.widgetService.dashboard = [];
        this.claimService.setClaimsByScreen(null);
        return this.LoadScreenAsync(id, true).subscribe((item: IScreenSettings) => {
            this.claimService.setClaimsByScreen(item.claims);
            this.ScreenId = item.id;
            this.ScreenName = item.screenName;
            this.widgetService.dashboard = item.widgets.map((widget) => {
                const minItemCols = WIDGETS[widget.widgetType]?.minItemCols ?? 6;
                const minItemRows = WIDGETS[widget.widgetType]?.minItemRows ?? 6;
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
            (ans) => {
                this.GetScreens();
            },
            (error) => console.log(error)
        );
    }

    public deleteScreen(id: string): Subscription {
        return this.http.delete(this.restUrl + '/api/user-management/screen/' + id).subscribe(
            (ans) => {
                if (this.ScreenId === Number(id)) {
                    this.ScreenId = undefined;
                }

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
                    this.GetScreens();
                },
                (error) => console.log(error)
            );
    }

    public clearScreens(): void {
        this._screens$.next(null);
    }
}
