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
export class DocumentCodingComponent extends WidgetPlatform implements OnInit, OnDestroy {
  static itemCols = 18;
  static itemRows = 14;

  objectKeys = Object.keys;

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
    for (const key of this.objectKeys(this.filter)) {
      if (key === itemActive) {
        this.filter[key] = true;
      } else {
        this.filter[key] = false;
      }
    }
  }

  disabled(): void {
    for (const key of this.objectKeys(this.filter)) {
      this.filter[key] = false;
    }
  }
}
