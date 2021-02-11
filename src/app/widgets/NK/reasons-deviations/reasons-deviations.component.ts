import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { OilTransferService } from '../oil-operations/oil-transfer.service';
import { ReasonsDeviationsService } from './reasons-deviations.service';
import { IOilOperationsTank, IOilShipmentStatistics, IOilTransfer } from '../../../dashboard/models/oil-operations';

export interface IOilReasonsDeviations {
    id: number;
    transferNumber: number;
    tank: IOilOperationsTank;
    startTime: Date;
    endTime: Date;
    mass: number;
    shipmentsMass: number;
    shipmentsMassPercent: number;
    deviation: number;
    deviationPercent: number;
    maxDeviation: number;
    maxDeviationPercent: number;
    debalance: number;
    debalancePercent: number;
    shipmentStatistics: IOilShipmentStatistics;
}

@Component({
    selector: 'evj-reasons-deviations',
    templateUrl: './reasons-deviations.component.html',
    styleUrls: ['./reasons-deviations.component.scss'],
})
export class ReasonsDeviationsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IOilReasonsDeviations | null = null;

    public selectedTransfer: IOilTransfer | null = null;

    constructor(
        public widgetService: WidgetService,
        private oilTransferService: OilTransferService,
        private reasonsDeviationsService: ReasonsDeviationsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.oilTransferService.currentTransfer.subscribe((transfer) => {
            if (transfer) {
                this.getData(transfer.id);
                this.selectedTransfer = transfer;
            }
        });
    }

    private async getData(transferIdParam: number): Promise<void> {
        this.data = await this.reasonsDeviationsService.getData<IOilReasonsDeviations>(transferIdParam);
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
