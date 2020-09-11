import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IOZSMLineDiagram } from '../../../dashboard/models/OZSM/ozsm-line-diagram.model';

@Component({
    selector: 'evj-ozsm-line-diagrams',
    templateUrl: './ozsm-line-diagrams.component.html',
    styleUrls: ['./ozsm-line-diagrams.component.scss']
})

export class OzsmLineDiagramsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IOZSMLineDiagram[] = [
        {
            id: '0',
            title: 'Компоненты TDAE(1степень)',
            fact: 200000,
            plan: 248045
        },
        {
            id: '1',
            title: 'ДЕАСФ, 1 СТУПЕНИ',
            fact: 200000,
            plan: 248045
        },
        {
            id: '2',
            title: 'ДЕАСФ, 2 СТУПЕНИ',
            fact: 200000,
            plan: 248045
        },
        {
            id: '3',
            title: 'ПЕТРОЛАТУМ на экспорт',
            fact: 200000,
            plan: 248045
        }
    ];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
