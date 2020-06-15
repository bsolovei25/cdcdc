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
}
