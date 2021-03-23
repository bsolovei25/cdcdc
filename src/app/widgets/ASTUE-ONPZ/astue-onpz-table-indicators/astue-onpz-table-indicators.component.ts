import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IColumnsToDisplay } from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import {
    IAstueOnpzTableIndicatorsItem,
    IAstueOnpzTableIndicatorsItemChild,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-table-indicators.model';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'evj-astue-onpz-table-indicators',
    templateUrl: './astue-onpz-table-indicators.component.html',
    styleUrls: ['./astue-onpz-table-indicators.component.scss'],
})
export class AstueOnpzTableIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IAstueOnpzTableIndicatorsItem[] = [];
    public columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Параметры', date: null },
        { name: 'Факт', date: null },
        { name: 'Модель', date: null },
    ];

    public expandedElement: SelectionModel<string> = new SelectionModel(true);

    constructor(
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.mnemonicFurnaceService.furnaceOptions$.subscribe((x) => {
                if (!x.ovenId) {
                    this.data = [];
                    return;
                }
                this.setWsOptions(x);
            })
        );
    }

    protected dataHandler(ref: { groups: IAstueOnpzTableIndicatorsItem[] }): void {
        // ref.groups
        //     .flatMap((x) => x.items)
        //     .filter((x) => !!x)
        //     .forEach((x) => (x.id = x.name));
        this.data = ref.groups;
    }

    public onClickTr(event: MouseEvent, element: IAstueOnpzTableIndicatorsItem): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    public onClickRow(event: MouseEvent, element: IAstueOnpzTableIndicatorsItemChild): void {
        event.stopPropagation();
        this.mnemonicFurnaceService.selectItem(element?.id);
    }

    public selectedProduct$(element: IAstueOnpzTableIndicatorsItemChild): Observable<boolean> {
        return this.mnemonicFurnaceService.selectedItem$.asObservable().pipe(map((x) => x === element?.id));
    }
}
