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
import { OftenClosedPositionsService } from '@dashboard/services/widgets/CMID/often-closed-positions.service';

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
        
        // Often closed positions mock
        this.positionsList = [
            {
                name: 'Test name',
                plant: 'AA-12',
                closeCount: 12
            },
            {
                name: 'Very long Test name prototype 2',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'Just another plant',
                plant: 'KVBJO-1040',
                closeCount: 999
            },
            {
                name: 'Simple name',
                plant: '0',
                closeCount: 999
            },
            {
                name: '1',
                plant: '-',
                closeCount: 0
            },
            {
                name: '',
                plant: '',
                closeCount: 0
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'Test name',
                plant: 'AA-12',
                closeCount: 12
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
            {
                name: 'test',
                plant: 'BC-04',
                closeCount: 999
            },
        ];
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
