import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-sou-operational-accounting-system',
    templateUrl: './sou-operational-accounting-system.component.html',
    styleUrls: ['./sou-operational-accounting-system.component.scss']
})
export class SouOperationalAccountingSystemComponent extends WidgetPlatform implements OnInit, OnDestroy {

    popupElementsStates: Map<string, boolean> = new Map<string, boolean>();

    constructor(protected widgetService: WidgetService,
                @Inject('isMock') public isMock: boolean,
                @Inject('widgetId') public id: string,
                @Inject('uniqId') public uniqId: string) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public togglePopupElement(key: string, value: boolean): void {
        this.popupElementsStates.set(key, value);
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }

}
