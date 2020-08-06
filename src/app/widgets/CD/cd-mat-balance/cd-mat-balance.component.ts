import {
    Component, ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss']
})
export class CdMatBalanceComponent extends WidgetPlatform implements OnInit, OnDestroy {

    isSelectedEl: number;

    constructor(
        protected widgetService: WidgetService,
        private cdMatBalanceService: CdMatBalanceService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.cdMatBalanceService.showDeviation.subscribe(value => {
                this.isSelectedEl = value;
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }

}
