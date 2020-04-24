import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
  selector: 'evj-oil-operations',
  templateUrl: './oil-operations.component.html',
  styleUrls: ['./oil-operations.component.scss']
})
export class OilOperationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
  static itemCols = 18;
  static itemRows = 14;

  public data: any = [
    {
      id: 1,
      name: 'EVJ',
      tanks: 'JNDSFDSKDFD'
    },
  ]

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
