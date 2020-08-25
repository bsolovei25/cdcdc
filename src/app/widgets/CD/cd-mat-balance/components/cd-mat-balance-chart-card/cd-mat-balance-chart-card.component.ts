import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Inject,
    OnDestroy, Injector
} from '@angular/core';
import { ISplineDiagramData } from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { ISplineDiagramSize } from '../../../cd-shared/cd-line-chart/cd-line-chart.component';
import { WidgetPlatform } from '../../../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-cd-mat-balance-chart-card',
    templateUrl: './cd-mat-balance-chart-card.component.html',
    styleUrls: ['./cd-mat-balance-chart-card.component.scss']
})
export class CdMatBalanceChartCardComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('chart')
    public chartElement: ElementRef;

    public data: ISplineDiagramData;
    public size: ISplineDiagramSize;

    constructor(
        protected widgetService: WidgetService,
        public injector: Injector,
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
        if (ref) {
            this.data = ref;
            console.log(ref);
        }
    }

    public ngAfterViewInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight
        };
    }
}
