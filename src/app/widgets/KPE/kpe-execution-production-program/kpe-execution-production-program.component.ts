import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-kpe-execution-production-program',
    templateUrl: './kpe-execution-production-program.component.html',
    styleUrls: ['./kpe-execution-production-program.component.scss']
})
export class KpeExecutionProductionProgramComponent extends WidgetPlatform<unknown> implements OnInit {

    public cells: number [] = new Array(100);
    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
    }
}
