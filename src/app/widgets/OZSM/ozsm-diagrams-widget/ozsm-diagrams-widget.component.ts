import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IOzsmCircleDiagramFull } from '../ozsm-shared/ozsm-circle-diagram-full/ozsm-circle-diagram-full.component';

@Component({
    selector: 'evj-ozsm-diagrams-widget',
    templateUrl: './ozsm-diagrams-widget.component.html',
    styleUrls: ['./ozsm-diagrams-widget.component.scss'],
})
export class OzsmDiagramsWidgetComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public circleDiagramData: IOzsmCircleDiagramFull = {
        fact: 80,
        plan: 100,
        unit: 'Test',
        deviationDays: [1, 3, 4],
    };

    constructor(
        public widgetService: WidgetService,
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

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
