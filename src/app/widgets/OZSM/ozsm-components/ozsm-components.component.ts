import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IOZSMLineDiagram } from '../../../dashboard/models/OZSM/ozsm-line-diagram.model';

@Component({
    selector: 'evj-ozsm-components',
    templateUrl: './ozsm-components.component.html',
    styleUrls: ['./ozsm-components.component.scss']
})

export class OzsmComponentsComponent extends WidgetPlatform implements OnInit {
    data: IOZSMLineDiagram[] = [
        {
            id: '0',
            title: 'Компоненты TDAE(1степень)',
            level: 90,
            value: 248045
        },
        {
            id: '1',
            title: 'ДЕАСФ, 1 СТУПЕНИ',
            level: 45,
            value: 248045
        }
    ];
    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
        }
    }

}
