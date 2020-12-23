import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import {
    catalystProduction,
    offSiteCollectors,
    offSiteFacilities,
    other,
    productionFour, productionOne,
    productionTrade,
    productionTwo
} from './sou-main-screen-data.mock';
import { ISOUOperationalAccountingSystem } from '../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

export interface IInstallation {
    id: number;
    name: string;
    deviation: number;
    active: boolean;
    widgetName?: string;
    installationId?: number;
}

export interface IInstallations {
    productionOneData: IInstallation[];
    productionTwoData: IInstallation[];
    productionFourData: IInstallation[];
    productionTradeData: IInstallation[];
    offSiteCollectorsData: IInstallation;
    offSiteFacilitiesData: IInstallation;
    catalystProductionData: IInstallation;
    otherData: IInstallation;
}

@Component({
    selector: 'evj-sou-main-screen',
    templateUrl: './sou-main-screen.component.html',
    styleUrls: ['./sou-main-screen.component.scss']
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {

public data: IInstallations =  {
    productionOneData: productionOne,
    productionTwoData: productionTwo,
    productionFourData: productionFour,
    productionTradeData: productionTrade,
    offSiteCollectorsData: offSiteCollectors,
    offSiteFacilitiesData: offSiteFacilities,
    catalystProductionData: catalystProduction,
    otherData: other,
};


    constructor(
        protected widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        console.log(this.mvpService.deviationToMainScreen);
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        this.mvpService.deviationToMainScreen = ref?.section[0]?.countFlowExceedingConfInterval;
    }

}
