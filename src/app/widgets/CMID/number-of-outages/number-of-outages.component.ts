import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { WidgetService } from "@dashboard/services/widget.service";
import { HttpClient} from "@angular/common/http";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { NumberOfOutagesCardComponent } from "@widgets/CMID/number-of-outages/components/number-of-outages-card/number-of-outages-card.component";
import { ComponentType } from "@angular/cdk/overlay";
import { BehaviorSubject } from "rxjs";
import { INumberOfOutagesModel } from "@widgets/CMID/number-of-outages/models/number-of-outages.model";
import { OUTAGES_MOCK } from "@widgets/CMID/number-of-outages/number-of-outages.mock";

@Component({
    selector: 'evj-number-of-outages',
    templateUrl: './number-of-outages.component.html',
    styleUrls: ['./number-of-outages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberOfOutagesComponent extends WidgetPlatform implements OnInit {
    public outagesCard: ComponentType<NumberOfOutagesCardComponent> = NumberOfOutagesCardComponent;
    public $outages: BehaviorSubject<INumberOfOutagesModel[]> = new BehaviorSubject<INumberOfOutagesModel[]>(null);

    constructor(
        protected widgetService: WidgetService,
        private http: HttpClient,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        // ToDo Need to use data from service
        this.$outages.next(OUTAGES_MOCK);
    }

    onConfirmFilter(): void {
        // ToDo Filter logic should be here
    }

    protected dataHandler(ref: unknown): void {
    }
}
