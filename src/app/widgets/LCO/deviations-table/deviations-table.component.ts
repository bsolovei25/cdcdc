import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

export interface IDeviationsTable {
    equipment: string;
    energy: number;
    energyPercentage: number;
    consumption: number;
    consumptionPercentage: number;
    fuel: number;
    fuelPercentage: number;
    nonCritical: boolean;
}

export interface IDeviationsTableDto {
    items: IDeviationsTable[];
    consumptionUnitsOfMeasure: string;
    energyUnitsOfMeasure: string;
    fuelUnitsOfMeasure: string;
}

@Component({
    selector: 'evj-deviations-table',
    templateUrl: './deviations-table.component.html',
    styleUrls: ['./deviations-table.component.scss'],
})
export class DeviationsTableComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IDeviationsTable[] = [];

    public consumptionUnitsOfMeasure: string = '';
    public energyUnitsOfMeasure: string = '';
    public fuelUnitsOfMeasure: string = '';

    public isDataLoading: boolean = true;

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

    protected dataHandler(ref: IDeviationsTableDto): void {
        if (this.isDataLoading) {
            setTimeout(() => (this.isDataLoading = false), 500);
        }

        this.data = ref.items;
        this.consumptionUnitsOfMeasure = ref.consumptionUnitsOfMeasure;
        this.energyUnitsOfMeasure = ref.energyUnitsOfMeasure;
        this.fuelUnitsOfMeasure = ref.fuelUnitsOfMeasure;
    }
}
