import { Component, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { IAsEfProduct } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { AstueEfficiencyService } from '../../../../../dashboard/services/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-items',
    templateUrl: './astue-efficiency-items.component.html',
    styleUrls: ['./astue-efficiency-items.component.scss']
})
export class AstueEfficiencyItemsComponent implements OnChanges, OnDestroy {
    @Input() public data: IAsEfProduct[] = [];

    @Output() private selectProduct: EventEmitter<string> = new EventEmitter<string>();

    public direction: 'in' | 'out' = 'in';

    public cardSelection: SelectionModel<IAsEfProduct> = new SelectionModel<IAsEfProduct>();

    private subscriptions: Subscription[] = [];

    constructor(private AsEfService: AstueEfficiencyService) {
    }

    public ngOnChanges(): void {
        this.iconMap();
        this.selectionOnChanges();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    private selectionOnChanges(): void {
        const activeProduct = this.cardSelection.selected[0]?.name;
        if (activeProduct) {
            const product = this.data.find((item) => item.name === activeProduct);
            this.cardSelection.select(product);
            this.selectProduct.emit(product.name);
        } else {
            if (this.data.length) {
                this.cardSelection.select(this.data[0]);
                this.selectProduct.emit(this.data[0].name);
            }
        }
    }

    public onSelectProduct(product: IAsEfProduct): void {
        this.cardSelection.select(product);
        this.AsEfService.clearOpenedUnits();
        this.AsEfService.clearUnits();
        this.selectProduct.emit(product.name);
        this.AsEfService.selectionUnit$.next([]);
        this.AsEfService.selectionFlow$.next([]);
    }

    public iconMap(): void {
        this.data.forEach((item) => {
            switch (item.name) {
                case 'Пар':
                    item.icon = 'steam';
                    break;
                case 'Азот':
                    item.icon = 'nitrogen';
                    break;
                case 'Химически очищенная вода':
                    item.icon = 'cleaned-water';
                    break;
                case 'Воздух технический':
                    item.icon = 'tech-air';
                    break;
                case 'Воздух КИП':
                    item.icon = 'kip-air';
                    break;
                case 'Топливный газ природный':
                    item.icon = 'nature-gaz';
                    break;
                case 'Топливный газ':
                    item.icon = 'gaz';
                    break;
                case 'Вода теплофикации':
                    item.icon = 'term-water';
                    break;
                default:
                    item.icon = 'steam';
                    break;
            }
        });
    }
}
