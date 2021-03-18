import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import {
    ICircleData,
    IOzsmCirclePlanningDiagramResponse,
} from '../../../dashboard/models/OZSM/ozsm-circle-planning-diagram.model';
import { cardData } from './ozsm-circle-planning-diagam-mock';
import { OzsmService } from '../../../dashboard/services/widgets/OZSM/ozsm.service';

@Component({
    selector: 'evj-ozsm-circle-planning-diagram',
    templateUrl: './ozsm-circle-planning-diagram.component.html',
    styleUrls: ['./ozsm-circle-planning-diagram.component.scss'],
})
export class OzsmCirclePlanningDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public cData: ICircleData[] = cardData;
    public pData: ICircleData[] = [];
    constructor(
        private ozsmService: OzsmService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
        this.ozsmService.scenarioIdFilter$.subscribe((res) => this.getData(res));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private async getData(scenarioId: string): Promise<void> {
        const res = await this.ozsmService.getPlanningDiagram(scenarioId);
        this.dataMapper(res);
    }

    private dataMapper(res: IOzsmCirclePlanningDiagramResponse): void {
        console.log('pd', res);
        res = res[0];
        this.pData = [
            {
                name: 'переработки',
                value: res.summary.value,
                deviation: res.summary.deviation,
                percentValue: res.summary.percent,
            },
            {
                name: 'отгрузки',
                value: res.ship.value,
                deviation: res.ship.deviation,
                percentValue: res.ship.percent,
            },
        ];
        this.cData = [
            {
                name: 'Выработка',
                value: res.supply.value,
                deviation: res.supply.deviation,
                percentValue: res.supply.percent,
            },
            {
                name: 'Смешение',
                value: res.blend.value,
                deviation: res.blend.deviation,
                percentValue: res.blend.percent,
            },
            {
                name: 'Налив',
                value: res.pouring.value,
                deviation: res.pouring.deviation,
                percentValue: res.pouring.percent,
            },
            {
                name: 'Фасовка',
                value: res.pack.value,
                deviation: res.pack.deviation,
                percentValue: res.pack.percent,
            },
        ];
    }

    protected dataHandler(ref: unknown): void {}
}
