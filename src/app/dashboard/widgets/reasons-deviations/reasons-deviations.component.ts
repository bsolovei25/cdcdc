import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../models/@PLATFORM/widget-platform';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'evj-reasons-deviations',
  templateUrl: './reasons-deviations.component.html',
  styleUrls: ['./reasons-deviations.component.scss']
})
export class ReasonsDeviationsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

  public static itemCols: number = 28;
  public static itemRows: number = 14;
  public static minItemCols: number = 26;
  public static minItemRows: number = 14;

  constructor(
    public widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.isRealtimeData = false;
    this.widgetIcon = 'reference';
  }

  ngOnInit(): void {
    super.widgetInit();
  }

  protected dataHandler(ref: any): void {
    //this.data = ref;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
