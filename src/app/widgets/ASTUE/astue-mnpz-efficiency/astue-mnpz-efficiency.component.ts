import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
    IAsEfProduct,
    IAsEfUnitNew,
    IAsEfFlow,
    IAsEfTable,
    IAsPlanningTable,
} from '@dashboard/models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { WidgetService } from '@dashboard/services/widget.service';
import { AstueEfficiencyService } from '@dashboard/services/widgets/ASTUE/astue-efficiency.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { BehaviorSubject } from 'rxjs';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { fillDataShape } from '@shared/functions/common-functions';
import { debounceTime, map } from 'rxjs/operators';

@DecorateUntilDestroy()
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

    private unitSubchannels: VirtualChannel<IAsEfUnitNew>[] = [];

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
        this.astueEfficiencyService.selectionFlow$.pipe(takeUntilDestroyed(this)).subscribe((value) => {
            this.initialData = [];
            value?.forEach((flow) => {
                if (flow?.initialData) {
                    this.initialData = [...this.initialData, ...flow?.initialData];
                }
            });
        });
        this.astueEfficiencyService.unitsTablePlanning$.pipe(takeUntilDestroyed(this)).subscribe((value) => {
            this.tableDisplay = value;
        });
        this.astueEfficiencyService.selectionUnit$
            .pipe(
                takeUntilDestroyed(this),
                map((x) => x?.map((u) => u.id) ?? [])
            )
            .subscribe((x) => {
                const currentChannelsId = this.unitSubchannels.map((ch) => ch.id);
                const addId = x.filter((id) => !currentChannelsId.some((cid) => cid === id));
                const deleteId = currentChannelsId.filter((id) => !x.some((cid) => cid === id));
                deleteId.forEach((id) => {
                    const idx = this.unitSubchannels.findIndex((u) => u.id === id);
                    this.unitSubchannels[idx].dispose();
                    this.unitSubchannels.splice(idx, 1);
                    this.data.flatMap((p) => p.units).find((u) => u.id === id).initialData = null;
                    this.astueEfficiencyService.data.next([...this.data]);
                });
                const channels = addId.map(
                    (id) =>
                        new VirtualChannel<IAsEfUnitNew>(this.widgetService, {
                            channelId: this.widgetId,
                            subchannelId: id,
                        })
                );
                channels.forEach((ch) => {
                    ch.data$.pipe(takeUntilDestroyed(this)).subscribe((d) => {
                        const unit = this.data.flatMap((p) => p.units).find((u) => u.id === d.id);
                        if (!unit) {
                            return;
                        }
                        Object.assign(unit, d);
                        this.data = this.data.map((q) => fillDataShape(q));
                        this.astueEfficiencyService.data.next(this.data);
                    });
                });
                this.unitSubchannels = [...this.unitSubchannels, ...channels];
            });
    }

    public ngOnDestroy(): void {
        this.unitSubchannels.forEach((x) => x.dispose());
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { products: IAsEfProduct[] }): void {
        if (!this.data?.length) {
            this.data = ref.products ?? [];
        }
        const addProducts = ref.products.filter((p) => !this.data.some((x) => x.id === p.id));
        const delProducts = this.data.filter((p) => !ref.products.some((x) => x.id === p.id));
        this.data = [...this.data, ...addProducts];
        delProducts.forEach((x) => this.data.splice(this.data.indexOf(x), 1));
        this.data.forEach((p) => {
            const compareProduct = ref.products.find((x) => x.id === p.id);
            if (!compareProduct) {
                return;
            }
            const addUnits = compareProduct.units.filter((u) => !p.units.some((x) => x.id === u.id));
            const delUnits = p.units.filter((u) => !p.units.some((x) => x.id === u.id));
            p.units = [...p.units, ...addUnits];
            delUnits.forEach((x) => p.units.splice(p.units.indexOf(x), 1));
        });
        this.astueEfficiencyService.data.next(this.data);
        this.isLoading = false;
    }

    public toggleDisplay(event: boolean): void {
        this.isGraphDisplay = event;
    }

    public toggleIsInitialDataShows(val: boolean): void {
        this.isInitialDataShow = val;
    }

    public onSelectProduct(id: string): void {
        if (id === this.selection.selected?.[0]?.id) {
            return;
        }
        this.data = this.data.sort((a, b) => a.name.localeCompare(b.name));
        const product = this.data.find((item) => item.id === id);
        this.units = product?.units;
        this.astueEfficiencyService.selectionUnit$.next([]);
        this.data.flatMap((x) => x.units).forEach((x) => (x.initialData = null));
        this.data = [...this.data];
        this.astueEfficiencyService.data.next(this.data);
        this.selection.select(product);
        this.astueEfficiencyService.productId = product.id;
        this.astueEfficiencyService.selectionProduct$.next(this.selection.selected);
    }
}
