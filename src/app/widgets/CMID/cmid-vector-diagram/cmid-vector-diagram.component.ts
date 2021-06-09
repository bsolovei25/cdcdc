import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { OftenClosedPositionsService } from '@dashboard/services/widgets/CMID/cmid-often-closed-positions/often-closed-positions.service';
import {
    cmidVectorDiagramData,
    radarOptions
} from '@widgets/CMID/cmid-vector-diagram/const/cmid-vector-diagram.const';
import {
    ICmidVectorDiagramModel,
    ICmidVectorDiagramRadarOptions
} from '@widgets/CMID/cmid-vector-diagram/models/cmid-vector-diagram.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'evj-cmid-vector-diagram',
    templateUrl: './cmid-vector-diagram.component.html',
    styleUrls: ['./cmid-vector-diagram.component.scss']
})

export class CmidVectorDiagrammComponent extends WidgetPlatform<unknown> {
    public data: ICmidVectorDiagramModel[] = cmidVectorDiagramData;
    public radarOptions: ICmidVectorDiagramRadarOptions = radarOptions;
    public checkedChartId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(
        public cdRef: ChangeDetectorRef,
        public widgetService: WidgetService,
        public oftenClosedPositionsService: OftenClosedPositionsService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public onCheck(id: number): void {
        this.checkedChartId$.next(id);
        // ToDo: Отправляем на бэк ID выбранного блока
    }

    protected dataHandler(ref: unknown): void {
        throw new Error('Method not implemented.');
    }
}
