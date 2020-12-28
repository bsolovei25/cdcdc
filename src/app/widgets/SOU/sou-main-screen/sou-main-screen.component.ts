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
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { IInstallations } from '../../../dashboard/models/SOU/sou-main-screen.model';
import { SouMainScreenService } from '../../../dashboard/services/widgets/SOU/sou-main-screen.service';
import set = Reflect.set;

@Component({
    selector: 'evj-sou-main-screen',
    templateUrl: './sou-main-screen.component.html',
    styleUrls: ['./sou-main-screen.component.scss']
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {

    public data: IInstallations = {
        productionOneData: productionOne,
        productionTwoData: productionTwo,
        productionFourData: productionFour,
        productionTradeData: productionTrade,
        offSiteCollectorsData: offSiteCollectors,
        offSiteFacilitiesData: offSiteFacilities,
        catalystProductionData: catalystProduction,
        otherData: other
    };
    public allInstallations: any;


    constructor(
        protected widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        public souMainScreenService: SouMainScreenService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getAllInstallations();
        setTimeout(() => {
            console.log(this.allInstallations);
        }, 5000);
    }

    async getAllInstallations(): Promise<void> {
        const d = await this.souMainScreenService.getAllInstallations('sou-main-screen');
        this.allInstallations = d[1].data.group;
    }

    protected dataHandler(ref: any): void {
    }

}
