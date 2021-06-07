import { Component, Inject, OnInit, } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { CmidFactorAnalysisService } from "@dashboard/services/widgets/CMID/cmid-factor-analysis/cmid-factor-analysis.service";
import { CmidFactorAnalysisItemsComponent } from "./components/cmid-factor-analysis-header/cmid-factor-analysis-items.component";
import { FACTOR_HEADER } from "./cmid-factor-analysis.mocks";

export interface IItems {
    name: string,
    link: string,
}
export interface IFactorHeader {
    name: string,
    items: IItems[]
}
export interface IListItems {
    name: string,
    shield: string,
    shield_set: string,
    eco_leaf: string,
    timer_return: string,
}

export interface IFactorItems {
    name: string,
    shield: string,
    shield_set: string,
    eco_leaf: string,
    timer_return: string,
    list: IListItems[],
}

@Component({
    selector: 'cmid-factor-analysis',
    templateUrl: './cmid-factor-analysis.component.html',
    styleUrls: ['./cmid-factor-analysis.component.scss']
})
export class CmidFactorAnalysisComponent extends WidgetPlatform<unknown> implements OnInit {
    public isSelectedQuality: boolean = false;
    public isShowDistribution: boolean = false;
    public readonly specialComponent: typeof CmidFactorAnalysisItemsComponent = CmidFactorAnalysisItemsComponent;
    public hideEmptyItems: boolean = false;
    public data = FACTOR_HEADER;

    constructor(
        protected widgetService: WidgetService,
        private cmidFactorAnalysisService: CmidFactorAnalysisService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}