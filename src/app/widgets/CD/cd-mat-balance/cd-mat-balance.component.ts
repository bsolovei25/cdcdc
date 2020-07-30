import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

export interface IMnemonic {
    id: number;
    name: string;
    value: number;
    engUnits: string;
    description?: string;
}

@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss']
})
export class CdMatBalanceComponent extends WidgetPlatform implements OnInit, OnDestroy {

    data: IMnemonic[] = [
        {
            id: 1,
            name: 'dsad',
            value: 200,
            engUnits: '20'
        }
    ];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.draw();
    }

    private draw(): void {
        const unit = document.querySelectorAll('.text');
        console.log(unit);
    }


}
