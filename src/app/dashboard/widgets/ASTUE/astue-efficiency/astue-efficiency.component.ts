import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
    IAsEfProduct,
    IAsEfUnitNew,
    IAsEfFlow,
} from '../../../models/ASTUE/astue-efficiency.model';
import { AstueEfficiencyService } from '../../../services/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency',
    templateUrl: './astue-efficiency.component.html',
    styleUrls: ['./astue-efficiency.component.scss'],
})
export class AstueEfficiencyComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public isGraphDisplay: boolean = true;
    public isInitialDataShow: boolean = true;

    public static itemCols: number = 58;
    public static itemRows: number = 25;
    public static minItemCols: number = 58;
    public static minItemRows: number = 20;

    public data: IAsEfProduct[] = [];

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
        this.data = ref.products;
    }

    public toggleDisplay(event: boolean): void {
        this.isGraphDisplay = event;
    }

    public onSelectProduct(name: string): void {
        const product = this.data.find((item) => item.name === name);
        this.selection.select(product);
        this.AsEfService.change$.next();
    }
}
