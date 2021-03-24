import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    IOZSMLineDiagram,
    IOzsmLineDiagramResponse,
    IOzsmLineDiagramType,
} from '../../../dashboard/models/OZSM/ozsm-line-diagram.model';
import { OzsmService } from '../../../dashboard/services/widgets/OZSM/ozsm.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'evj-ozsm-line-diagrams',
    templateUrl: './ozsm-line-diagrams.component.html',
    styleUrls: ['./ozsm-line-diagrams.component.scss'],
})
export class OzsmLineDiagramsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IOZSMLineDiagram[] = [];

    constructor(
        private ozsmService: OzsmService,
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        const type: IOzsmLineDiagramType = (this.attributes as any).DataUrl;
        this.ozsmService.scenarioIdFilter$.subscribe((res) => this.getData(res, type));
    }

    private async getData(scenarioId: string, type: IOzsmLineDiagramType): Promise<void> {
        const data = await this.ozsmService.getLineDiagrams(scenarioId, type);
        this.data = this.dataMapper(data);
    }

    private dataMapper = (res: IOzsmLineDiagramResponse): IOZSMLineDiagram[] => {
        return (
            res?.supplyData?.map((x) => ({
                title: x.name,
                fact: x.value,
                plan: x.value,
                percent: x.percent,
                disabled: !x.value && !x.percent
            })) ?? []
        );
    };

    protected dataHandler(ref: unknown): void {}
}
