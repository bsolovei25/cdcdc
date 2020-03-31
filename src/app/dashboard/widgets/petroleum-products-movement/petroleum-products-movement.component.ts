import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { PetroleumScreenService } from '../../services/petroleum-screen.service';
import { WidgetPlatform } from '../../models/widget-platform';

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
        protected widgetService: NewWidgetService,
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
        console.warn(this.widgetId + ' ' + this.isMock);
        super.dataConnect();
        this.initPetroleumMovement();
    }

    protected dataHandler(ref: any): void {}

    private async initPetroleumMovement(): Promise<void> {
        this.petroleumService.isLoad$.next(true);
        await this.petroleumService.setClient();
        // await this.petroleumService.getTransfers(null, null, true, this.petroleumService.client);
        const objects = await this.petroleumService.getObjects(this.petroleumService.client);
        this.petroleumService.objectsAll$.next(objects);
        this.petroleumService.isLoad$.next(false);
        setInterval(() => this.petroleumService.reGetTransfers(), this.refreshTimeoutSecs * 1000);
        this.petroleumService.currentTransfersFilter$.subscribe(
            (item) => {
                this.petroleumService.isLoad$.next(false);
                this.petroleumService.reGetTransfers();
            }
        );
    }
}
