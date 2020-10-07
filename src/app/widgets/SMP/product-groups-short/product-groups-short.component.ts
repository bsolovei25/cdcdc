import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IProducts } from '../../../dashboard/models/SMP/product-groups.model';

@Component({
    selector: 'evj-product-groups-short',
    templateUrl: './product-groups-short.component.html',
    styleUrls: ['./product-groups-short.component.scss'],
})
export class ProductGroupsShortComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    data: IProducts[] = [];

    value: IProducts = {
        id: 1,
        groupName: 'Бензины',
        pointStatus: 'normal',
        performance: 3,
        groupValue: 187863,
        groupValueTwo: 187863,
        groupDeviationValue: 'normal',
        groupDeviationFlag: 'normal',
        groupDeviationShip: 'normal',
        groupDeviationAkk: 'normal',
        groupDeviationUpd: 'normal',
        groupDeviationNotValue: 142543,
        groupDeviationAllValue: 321234,
        gaugePercent: 60,
        framedPecent: 20,
        notFramedPercent: 70,
        products: [
            {
                title: 'АИ-92 RERETESTST',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
            {
                title: 'АИ-92',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
            {
                title: 'АИ-92',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
            {
                title: 'АИ-92',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
            {
                title: 'АИ-92',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
            {
                title: 'АИ-92',
                piePercent: 70,
                gaugePercent: 70,
                pieStatus: 'normal',
                days: [
                    {
                        day: 1,
                        state: 'normal',
                    },
                    {
                        day: 2,
                        state: 'normal',
                    },
                    {
                        day: 3,
                        state: 'normal',
                    },
                    {
                        day: 4,
                        state: 'normal',
                    },
                    {
                        day: 5,
                        state: 'normal',
                    },
                    {
                        day: 6,
                        state: 'normal',
                    },
                    {
                        day: 7,
                        state: 'normal',
                    },
                    {
                        day: 8,
                        state: 'normal',
                    },
                    {
                        day: 9,
                        state: 'normal',
                    },
                    {
                        day: 10,
                        state: 'normal',
                    },
                    {
                        day: 11,
                        state: 'normal',
                    },
                    {
                        day: 12,
                        state: 'normal',
                    },
                    {
                        day: 13,
                        state: 'normal',
                    },
                    {
                        day: 14,
                        state: 'normal',
                    },
                    {
                        day: 15,
                        state: 'normal',
                    },
                    {
                        day: 16,
                        state: 'warning',
                    },
                    {
                        day: 17,
                        state: 'normal',
                    },
                    {
                        day: 18,
                        state: 'danger',
                    },
                    {
                        day: 19,
                        state: 'normal',
                    },
                    {
                        day: 20,
                        state: 'warning',
                    },
                    {
                        day: 21,
                        state: 'normal',
                    },
                    {
                        day: 22,
                        state: 'normal',
                    },
                    {
                        day: 23,
                        state: 'disabled',
                    },
                    {
                        day: 24,
                        state: 'disabled',
                    },
                    {
                        day: 25,
                        state: 'disabled',
                    },
                    {
                        day: 26,
                        state: 'disabled',
                    },
                    {
                        day: 27,
                        state: 'disabled',
                    },
                    {
                        day: 28,
                        state: 'disabled',
                    },
                    {
                        day: 29,
                        state: 'disabled',
                    },
                    {
                        day: 30,
                        state: 'disabled',
                    },
                ],
                productFiling: 'normal',
                productUpdate: 'normal',
                productCrowded: 'normal',
                productFlask: 'normal',
                productList: 'normal',
                productBuild: 'normal',
            },
        ],
    };

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
