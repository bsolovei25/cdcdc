import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
    IAsEfProduct,
    IAsEfUnitNew,
    IAsEfFlow,
} from '../../../dashboard/models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueEfficiencyService } from '../../../dashboard/services/ASTUE/astue-efficiency.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-astue-mnpz-efficiency',
    templateUrl: './astue-mnpz-efficiency.component.html',
    styleUrls: ['./astue-mnpz-efficiency.component.scss'],
})
export class AstueMnpzEfficiencyComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public isLoading: boolean = true;

    public isGraphDisplay: boolean = true;
    public isInitialDataShow: boolean = true;

    public data: IAsEfProduct[] = [];

    public units: IAsEfUnitNew[] = [];

    public selection: SelectionModel<IAsEfProduct> = new SelectionModel<IAsEfProduct>();
    public selectionUnits: SelectionModel<IAsEfUnitNew> = new SelectionModel<IAsEfUnitNew>(false);
    public selectionFlows: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(
        protected widgetService: WidgetService,
        private AsEfService: AstueEfficiencyService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        console.log(ref);

        this.data = ref.products;
        this.isLoading = false;
    }

    public toggleDisplay(event: boolean): void {
        this.isGraphDisplay = event;
    }

    public onSelectProduct(name: string): void {
        const product = this.data.find((item) => item.name === name);
        this.units = product.units;
        this.selection.select(product);
    }
}
