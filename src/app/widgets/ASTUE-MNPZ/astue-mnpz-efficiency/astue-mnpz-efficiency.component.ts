import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
    IAsEfProduct,
    IAsEfUnitNew,
    IAsEfFlow,
    IAsEfTable,
    IAsEfTableBlock,
    IAsPlanningTable,
} from '../../../dashboard/models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueEfficiencyService } from '../../../dashboard/services/widgets/ASTUE/astue-efficiency.service';
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
    public initialData: IAsEfTable[] = [];
    public tableDisplay: IAsPlanningTable[] = [];

    public selection: SelectionModel<IAsEfProduct> = new SelectionModel<IAsEfProduct>();
    public selectionUnits: SelectionModel<IAsEfUnitNew> = new SelectionModel<IAsEfUnitNew>(false);
    public selectionFlows: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(
        protected widgetService: WidgetService,
        private astueEfficiencyService: AstueEfficiencyService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.astueEfficiencyService.selectionFlow$.subscribe((value) => {
                this.initialData = [];
                value?.forEach((flow) => {
                    if (flow?.initialData) {
                        this.initialData = [...this.initialData, ...flow?.initialData];
                    }
                });
            }),
            this.astueEfficiencyService.unitsTablePlanning$.subscribe((value) => {
                this.tableDisplay = value;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { products: IAsEfProduct[] }): void {
        this.data = ref.products;
        this.isLoading = false;
    }

    public toggleDisplay(event: boolean): void {
        this.isGraphDisplay = event;
    }

    public toggleIsInitialDataShows(val: boolean): void {
        this.isInitialDataShow = val;
        this.astueEfficiencyService.selectionFlow$.next([]);
        this.astueEfficiencyService.selectionUnit$.next([]);
    }

    public onSelectProduct(id: string): void {
        this.data = this.data.sort((a, b) => a.name.localeCompare(b.name));
        const product = this.data.find((item) => item.id === id);
        this.units = product?.units;
        this.selection.select(product);
        this.astueEfficiencyService.selectionProduct$.next(this.selection.selected);
    }
}
