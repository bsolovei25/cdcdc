import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IDatesInterval, WidgetService } from '../../services/widget.service';
import { PetroleumScreenService } from '../../services/petroleum-screen.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Component({
    selector: 'evj-petroleum-products-movement',
    templateUrl: './petroleum-products-movement.component.html',
    styleUrls: ['./petroleum-products-movement.component.scss'],
})
export class PetroleumProductsMovementComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public static itemCols: number = 23;
    public static itemRows: number = 16;

    public typeScreen: string = 'info';
    protected isRealtimeData: boolean = false;

    private refreshTimeoutSecs: number = 45;

    constructor(
        protected widgetService: WidgetService,
        public petroleumService: PetroleumScreenService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.petroleumService.screenState$.subscribe((data) => {
                this.typeScreen = data;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.initPetroleumMovement();
    }

    protected dataHandler(ref: any): void {}

    private async initPetroleumMovement(): Promise<void> {
        this.petroleumService.isLoad$.next(true);
        try {
            await this.petroleumService.setClient();
            const objects = await this.petroleumService.getObjects(this.petroleumService.client);
            this.petroleumService.objectsAll$.next(objects);
        } catch (e) {
            console.error(e);
        }
        this.petroleumService.isLoad$.next(false);
        // setInterval(() => this.petroleumService.reGetTransfers(), this.refreshTimeoutSecs * 1000);
        this.widgetService.currentDates$.subscribe(
            (dates) => {
                this.petroleumService.reGetTransfers(dates);
            }
        );
        this.petroleumService.currentTransfersFilter$.subscribe(
            (item) => {
                this.petroleumService.isLoad$.next(false);
                this.petroleumService.reGetTransfers(this.widgetService.currentDates$.getValue());
            }
        );
    }
}
