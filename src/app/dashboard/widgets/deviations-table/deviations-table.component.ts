import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';

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

@Component({
    selector: 'evj-deviations-table',
    templateUrl: './deviations-table.component.html',
    styleUrls: ['./deviations-table.component.scss'],
})
export class DeviationsTableComponent extends WidgetPlatform implements OnInit, OnDestroy {
    data: IDeviationsTable[] = [
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
        {
            equipment: 'ЭЛОУ-АВТ-6',
            energy: 103,
            energyPercentage: 3,
            consumption: -150,
            consumptionPercentage: -50,
            fuel: 11,
            fuelPercentage: -1,
            nonCritical: true,
        },
    ];

    public static itemCols: number = 20;
    public static itemRows: number = 30;

    public static minItemCols: number = 20;
    public static minItemRows: number = 10;

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

    protected dataHandler(ref: IDeviationsTable[]): void {
        this.data = ref.map((item) => {
            return { ...item };
        });
    }
}
