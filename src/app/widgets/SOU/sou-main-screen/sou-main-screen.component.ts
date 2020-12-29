import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import {
    IAllInstallations,
    IInstallations, IInstallationsObj
} from '../../../dashboard/models/SOU/sou-main-screen.model';
import { SouMainScreenService } from '../../../dashboard/services/widgets/SOU/sou-main-screen.service';
import {
    catalystProduction,
    offSiteCollectors,
    offSiteFacilities,
    other,
    productionFour, productionOne,
    productionTrade,
    productionTwo
} from './sou-main-screen-data.mock';

@Component({
    selector: 'evj-sou-main-screen',
    templateUrl: './sou-main-screen.component.html',
    styleUrls: ['./sou-main-screen.component.scss']
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {

    public allInstallations: IAllInstallations[];
    public p: {} = {};

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
            console.log(Object.fromEntries(this.allInstallations.map(n => [n.type, n])));
            console.log(this.p.CatalystProduction);

        }, 5000);

    }

    async getAllInstallations(): Promise<void> {
        try {
            const d = await this.souMainScreenService.getAllInstallations('sou-main-screen');
            this.allInstallations = d[1].data.group;
            this.p = this.allInstallations.reduce((p, c) => { p[c.type] = c; return p; }, {});
            this.changeModel();
        } catch (e) {
            console.error(e);
        }
    }

    public changeModel(): IInstallations {
        return this.data = {
            catalystProductionData: this.p.CatalystProduction.items,
            offSiteCollectorsData: this.p.OffSiteCollectors.items,
            offSiteFacilitiesData: this.p.OffSiteFacilities.items,
            productionOneData: this.p.ProductionOne.items,
            productionTwoData: this.p.ProductionTwo.items,
            productionFourData: this.p.ProductionFour.items,
            otherData: this.p.Other.items,
            productionTradeData: this.p.ProductionTrade.items
        };
    }

    protected dataHandler(ref: any): void {
    }

}
