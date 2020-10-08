import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';
import { DocumentCodingService } from '../../services/oil-control-services/document-coding.service';

export interface IDocumentFilter {
  isFilterGroup: boolean;
  isFilterProduct: boolean;
  isFilterTanks: boolean;
}

@Component({
  selector: 'evj-document-coding',
  templateUrl: './document-coding.component.html',
  styleUrls: ['./document-coding.component.scss']
})
export class DocumentCodingComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
  public static itemCols: number = 48;
  public static itemRows: number = 15;
  public static minItemCols: number = 36;
  public static minItemRows: number = 12;

  filter: IDocumentFilter = {
    isFilterGroup: false,
    isFilterProduct: false,
    isFilterTanks: false,
  };

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

  openFilter(event: boolean, name: string): void {
    this.active(name);
  }

  closeFilter(event: boolean): void {
    this.disabled();
  }

  active(itemActive: string): void {
    Object.keys(this.filter).forEach(key => {
      if (key === itemActive) {
        this.filter[key] = true;
      } else {
        this.filter[key] = false;
      }
    });
  }

  disabled(): void {
    Object.keys(this.filter).forEach(item => {
      this.filter[item] = false;
    });
  }
}
