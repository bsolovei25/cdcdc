import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { HttpClient} from '@angular/common/http';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { CmidNumberOfOutagesCardComponent } from '@widgets/CMID/cmid-number-of-outages/components/cmid-number-of-outages-card/cmid-number-of-outages-card.component';
import { ComponentType } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import {
    INumberOfOutagesModel,
    IProduction
} from '@widgets/CMID/cmid-number-of-outages/models/cmid-number-of-outages.model';
import {
    OUTAGES_MOCK,
    PRODUCTIONS
} from '@widgets/CMID/cmid-number-of-outages/cmid-number-of-outages.mock';

@Component({
    selector: 'evj-number-of-outages',
    templateUrl: './cmid-number-of-outages.component.html',
    styleUrls: ['./cmid-number-of-outages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidNumberOfOutagesComponent extends WidgetPlatform implements OnInit {
    public outagesCard: ComponentType<CmidNumberOfOutagesCardComponent> = CmidNumberOfOutagesCardComponent;
    public $outages: BehaviorSubject<INumberOfOutagesModel[]> = new BehaviorSubject<INumberOfOutagesModel[]>(null);
    public productions: IProduction[] = PRODUCTIONS;

    constructor(
        private cdRef: ChangeDetectorRef,
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

    public onMouseEnter(): void {
        this.hoverTimer = setTimeout(() => {
            this.isHover = true
            this.cdRef.detectChanges();
            }, 200);
    }

    public onMouseExit(): void {
        this.hoverTimer = setTimeout(() => {
            this.isHover = false;
            this.cdRef.detectChanges();
                }, 200);
    }

    protected dataHandler(ref: unknown): void {
    }
}
