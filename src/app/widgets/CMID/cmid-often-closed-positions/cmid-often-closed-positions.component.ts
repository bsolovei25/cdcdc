import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';

import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { OftenClosedPositionsService } from '@dashboard/services/widgets/CMID/cmid-often-closed-positions/often-closed-positions.service';

import { ICmidOftenClosedPosition } from './cmid-often-closed-positions.interfaces';

@Component({
    selector: 'cmid-often-closed-positions',
    templateUrl: './cmid-often-closed-positions.component.html',
    styleUrls: ['./cmid-often-closed-positions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidOftenClosedPositionsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public positionsList: ICmidOftenClosedPosition[];

    constructor(
        public cdRef: ChangeDetectorRef,
        public widgetService: WidgetService,
        public oftenClosedPositionsService: OftenClosedPositionsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        // Mock
        this.positionsList = this.oftenClosedPositionsService.positionsList;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.cdRef.detach();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        // this.positionsList = await this.oftenClosedPositionsService.getPositionsList(this.widgetId);
        this.cdRef.detectChanges();
    }

    protected dataHandler(ref: { data: ICmidOftenClosedPosition[] }): void {
        this.positionsList = ref.data;
    }
}
