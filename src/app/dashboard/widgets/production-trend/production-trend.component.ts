import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'evj-production-trend',
  templateUrl: './production-trend.component.html',
  styleUrls: ['./production-trend.component.scss']
})
// export class ProductionTrendComponent extends WidgetPlatform implements OnInit, OnDestroy {
export class ProductionTrendComponent {

    public static itemCols: number = 20;
    public static itemRows: number = 16;

    // constructor(
    //     protected widgetService: WidgetService,
    //     @Inject('isMock') public isMock: boolean,
    //     @Inject('widgetId') public id: string,
    //     @Inject('uniqId') public uniqId: string
    // ) {
    //     super(widgetService, isMock, id, uniqId);
    // }

    // ngOnInit(): void {
    //     super.widgetInit();
    // }
    //
    // ngOnDestroy(): void {
    //     super.ngOnDestroy();
    // }
    //
    // protected dataHandler(ref: any): void {
    // }
}
