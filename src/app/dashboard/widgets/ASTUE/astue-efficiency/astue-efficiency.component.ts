import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';
import { AdminPanelService } from '../../../services/admin-panel/admin-panel.service';

@Component({
    selector: 'evj-astue-efficiency',
    templateUrl: './astue-efficiency.component.html',
    styleUrls: ['./astue-efficiency.component.scss'],
})
export class AstueEfficiencyComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public isGraphDisplay: boolean = true;
    public isInitialDataShow: boolean = true;

    public static itemCols: number = 58;
    public static itemRows: number = 25;
    public static minItemCols: number = 58;
    public static minItemRows: number = 20;

    constructor(
        protected widgetService: WidgetService,
        private adminService: AdminPanelService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    public toggleDisplay(event: boolean): void {
        this.isGraphDisplay = event;
    }
}
