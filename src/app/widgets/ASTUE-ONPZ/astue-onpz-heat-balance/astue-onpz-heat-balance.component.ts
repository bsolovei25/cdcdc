import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IColumnsToDisplay } from '../../APS/aps-recipe-diagram/aps-recipe-diagram.component';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AstueHeatBalanceDataType,
    IAstueOnpzHeatBalanceItem,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-heat-balance.model';
import { AstueOnpzMnemonicFurnaceService } from '../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'evj-astue-onpz-heat-balance',
    templateUrl: './astue-onpz-heat-balance.component.html',
    styleUrls: ['./astue-onpz-heat-balance.component.scss'],
})
export class AstueOnpzHeatBalanceComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    data$: BehaviorSubject<IAstueOnpzHeatBalanceItem[]> = new BehaviorSubject<
        IAstueOnpzHeatBalanceItem[]
    >([]);
    columnsToDisplay: IColumnsToDisplay[] = [
        { name: 'Показатели, Ккал', id: 0, date: new Date() },
        { name: 'Абсолютная величина', id: 1, date: new Date('2020-02-01T03:24:00') },
        { name: 'Относительная величина', id: 2, date: new Date('2020-02-02T03:24:00') },
    ];

    expandedElement: SelectionModel<string> = new SelectionModel(true);
    selectedRow: SelectionModel<string> = new SelectionModel(true);
    selectedType$: BehaviorSubject<AstueHeatBalanceDataType> = new BehaviorSubject<
        AstueHeatBalanceDataType
    >('oven');
    selectedItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.mnemonicFurnaceService.furnaceOptions$.subscribe((x) => {
                if (!x.ovenId) {
                    this.data$.next([]);
                    return;
                }
                this.setWsOptions(x);
            })
        );
    }

    protected dataHandler(ref: { item: IAstueOnpzHeatBalanceItem[] }): void {
        this.data$.next([...ref.item]);
    }

    changeDataType(type: AstueHeatBalanceDataType): void {
        if (this.selectedType$.value === type) {
            return;
        }
        this.selectedType$.next(type);
    }

    onClickTr(event: MouseEvent, element: IAstueOnpzHeatBalanceItem): void {
        event.stopPropagation();
        if (this.expandedElement.isSelected(element.name)) {
            this.expandedElement.deselect(element.name);
        } else {
            this.expandedElement.select(element.name);
        }
    }

    onClickRow(event: MouseEvent, element?: IAstueOnpzHeatBalanceItem): void {
        event.stopPropagation();
        if (this.selectedItem$.getValue() === element.name) {
            this.selectedItem$.next(null);
        } else {
            this.selectedItem$.next(element.name);
        }
    }

    public selectedProduct$(element: IAstueOnpzHeatBalanceItem): Observable<boolean> {
        return this.selectedItem$.asObservable().pipe(map((x) => x === element?.name));
    }

    public dataFilter(type: AstueHeatBalanceDataType): Observable<IAstueOnpzHeatBalanceItem[]> {
        return this.data$.asObservable().pipe(map((x) => x.filter((i) => i.typeData === type)));
    }
}
