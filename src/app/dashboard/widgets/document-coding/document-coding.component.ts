import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';
import { DocumentCodingService } from '../../services/oil-control-services/document-coding.service';

@Component({
  selector: 'evj-document-coding',
  templateUrl: './document-coding.component.html',
  styleUrls: ['./document-coding.component.scss']
})
export class DocumentCodingComponent extends WidgetPlatform implements OnInit, OnDestroy {
  static itemCols = 18;
  static itemRows = 14;

  public isFilterGroup: boolean = false;
  public isFilterProduct: boolean = false;
  public isFilterTanks: boolean = false;

  constructor(
    public widgetService: WidgetService,
    public oilService: DocumentCodingService,
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

  openFilterGroup(event: boolean): void {
    this.isFilterTanks = false;
    this.isFilterProduct = false;
    this.isFilterGroup = event;
  }

  openFilterProduct(event: boolean): void {
    this.isFilterGroup = false;
    this.isFilterTanks = false;
    this.isFilterProduct = event;
  }

  openFilterTanks(event: boolean): void {
    this.isFilterGroup = false;
    this.isFilterProduct = false;
    this.isFilterTanks = event;
  }

  closeFilterGroup(event: boolean): void {
    this.isFilterGroup = event;
  }
  closeFilterProduct(event: boolean): void {
    this.isFilterProduct = event;
  }

  closeFilterTanks(event: boolean): void {
    this.isFilterTanks = event;
  }

}
