import { Injectable } from '@angular/core';
import { NewWidgetService } from './new-widget.service';
import { NewUserSettings, NewUserGrid, ScreenSettings } from '../models/user-settings.model';
import { HttpClient } from '@angular/common/http';
import { WIDGETS } from '../components/new-widgets-grid/widget-map';
import { AppConfigService } from 'src/app/services/appConfigService';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';
import { IParamWidgetsGrid } from '../components/new-widgets-grid/new-widgets-grid.component';

@Injectable({
    providedIn: 'root',
})
export class NewUserSettingsService {
    private _screens$: BehaviorSubject<ScreenSettings[]> = new BehaviorSubject(null);

    public screens$: Observable<ScreenSettings[]> = this._screens$
        .asObservable()
        .pipe(filter((item) => item !== null));

    constructor(
        private widgetService: NewWidgetService,
        private http: HttpClient,
        configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
        localStorage.getItem('screen');
    }

    private restUrl: string;

    public UserId = 1;
    public ScreenId: number;
    public ScreenName: string;

    public dataScreen = [];

    public widgetInfo: NewUserGrid;

    public addCellByPosition(idWidget: string, nameWidget: string, param: IParamWidgetsGrid) {
        console.log('widget: ' + WIDGETS[nameWidget]);
        const uniqId = this.create_UUID();
        console.log(WIDGETS[nameWidget].minItemCols);
        this.widgetService.dashboard.push({
            x: param.x,
            y: param.y,
            cols: WIDGETS[nameWidget].itemCols,
            rows: WIDGETS[nameWidget].itemRows,
            minItemCols: WIDGETS[nameWidget]?.minItemCols ?? 5,
            minItemRows: WIDGETS[nameWidget]?.minItemRows ?? 5,
            id: idWidget,
            uniqid: uniqId,
            widgetType: nameWidget,
        });

        console.log(WIDGETS[nameWidget]);
        this.addWidgetApi(uniqId);
    }

    public create_UUID(): string {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    private addWidgetApi(uniqId: string) {
        this.save(uniqId);
        const updateWidget = this.widgetInfo;
        this.http
            .post(this.restUrl + '/api/user-management/widget/' + this.ScreenId, updateWidget)
            .subscribe(
                (ans) => {},
                (error) => console.log(error)
            );
    }

    private save(uniqId: string) {
        for (const item of this.widgetService.dashboard) {
            if (item.uniqid === uniqId) {
                const cellSetting: NewUserGrid = new (class implements NewUserGrid {
                    widgetId = item.id;
                    posX = item.x;
                    posY = item.y;
                    widgetType = item.widgetType;
                    sizeX = item.cols;
                    sizeY = item.rows;
                    uniqueId = item.uniqid;
                })();
                this.widgetInfo = cellSetting;
            } else {
            }
        }
    }

    private updateWidgetApi(uniqId) {
        this.save(uniqId);
        const updateWidget = this.widgetInfo;
        this.http
            .put(this.restUrl + '/api/user-management/widget/' + uniqId, updateWidget)
            .subscribe(
                (ans) => {},
                (error) => console.log(error)
            );
    }

    public updateByPosition(oldItem, newItem) {
        for (const item of this.widgetService.dashboard) {
            if (item.uniqid === oldItem.uniqid) {
                item.x = newItem.x;
                item.y = newItem.y;
                item.rows = newItem.rows;
                item.cols = newItem.cols;
                item.minItemCols = newItem.minItemCols;
                item.maxItemRows = newItem.maxItemRows;
            }
        }
        this.updateWidgetApi(oldItem.uniqid);
    }

    public removeItem(widgetId: string): void {
        this.http.delete(this.restUrl + '/api/user-management/widget/' + widgetId).toPromise();
    }

    public GetScreen(): void {
        try {
            this.http
                .get<ScreenSettings[]>(this.restUrl + '/api/user-management/screens')
                .subscribe((data) => {
                    this._screens$.next(data);
                    if (!this.ScreenId && data[0]) {
                        this.ScreenId = data[0].id;
                    }
                });
        } catch (e) {
            console.log('Error: couldn`t get screen!');
        }
    }

    private LoadScreenAsync(id: number, loadDefault: boolean): Observable<any> {
        return this.http.get(this.restUrl + '/api/user-management/screen/' + id).pipe(
            catchError((err) => {
                this.dataScreen = this._screens$.getValue();
                if (
                    err.status === 404 &&
                    loadDefault &&
                    this.dataScreen &&
                    this.dataScreen.length
                ) {
                    return this.LoadScreenAsync(this.dataScreen[0].id, false);
                }
                return throwError(err);
            })
        );
    }

    public LoadScreen(id: number) {
        localStorage.setItem('screenid', id.toString());
        return this.LoadScreenAsync(id, true).subscribe((item: ScreenSettings) => {
            this.ScreenId = item.id;
            this.ScreenName = item.screenName;
            this.widgetService.dashboard = item.widgets.map((widget) => {
                const _minItemCols = WIDGETS[widget.widgetType]?.minItemCols ?? 6;
                const _minItemRows = (WIDGETS[widget.widgetType]?.minItemRows ?? 6);
                console.log(_minItemCols, _minItemRows);
                const result = {
                    x: widget.posX,
                    y: widget.posY,
                    cols: widget.sizeX < _minItemCols ? _minItemCols : widget.sizeX,
                    rows: widget.sizeY < _minItemRows ? _minItemRows : widget.sizeY,
                    minItemCols: _minItemCols,
                    minItemRows: _minItemRows,
                    id: widget.widgetId,
                    widgetType: widget.widgetType,
                    uniqid: widget.uniqueId,
                };
                return result;
            });
            console.log(this.widgetService.dashboard);
        });
    }

    public PushScreen(nameWidget) {
        const userScreen: ScreenSettings = new (class implements ScreenSettings {
            id;
            screenName = nameWidget;
            user;
            updateScreen;
            widgets;
        })();
        return this.http.post(this.restUrl + '/api/user-management/screen', userScreen).subscribe(
            (ans) => {
                this.GetScreen();
            },
            (error) => console.log(error)
        );
    }

    public deleteScreen(id: string) {
        return this.http.delete(this.restUrl + '/api/user-management/screen/' + id).subscribe(
            (ans) => {
                if (this.ScreenId === Number(id)) {
                    this.ScreenId = undefined;
                }

                this.GetScreen();
            },
            (error) => console.log(error)
        );
    }

    public updateScreen(id, name) {
        const userScreen: ScreenSettings = new (class implements ScreenSettings {
            id = id;
            screenName = name;
            user;
            updateScreen;
            widgets;
        })();
        return this.http
            .put(this.restUrl + '/api/user-management/screen/' + id, userScreen)
            .subscribe(
                (ans) => {
                    this.GetScreen();
                },
                (error) => console.log(error)
            );
    }
}
