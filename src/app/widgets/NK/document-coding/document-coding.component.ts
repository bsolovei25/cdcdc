import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { DocumentCodingService } from '../../../dashboard/services/oil-control-services/document-coding.service';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';
import { IDocumentsScan } from '../../../dashboard/models/oil-document.model';
import { IOilOperationsProduct, IOilOperationsTank } from '../../../dashboard/models/oil-operations';

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

  public filter: IDocumentFilter = {
    isFilterGroup: false,
    isFilterProduct: false,
    isFilterTanks: false,
  };

  public tanks: IOilOperationsTank[] = [];

  public selectedTank: IOilOperationsTank | null = null;

  public selectedProduct: IOilOperationsProduct | null = null;

  public file: IDocumentsScan | null = null;

  constructor(
    public widgetService: WidgetService,
    public oilService: DocumentCodingService,
    public documentsScansService: DocumentsScansService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.isRealtimeData = false;
    this.widgetIcon = 'reference';
  }

  public ngOnInit(): void {
    super.widgetInit();

    this.documentsScansService.currentDocument.subscribe(documentInfo => {
        this.file = documentInfo;
        console.log(documentInfo, 'documentInfo');
        }
    );

    this.getTanks();
  }

  protected dataHandler(ref: any): void {
      console.log(ref, 'doc coding');
  }

  private async getTanks(): Promise<void> {
      this.tanks = await this.oilService.getFilterList<IOilOperationsTank>('tanks');
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public openFilter(event: boolean, name: string): void {
    this.active(name);
  }

  public closeFilter(): void {
    this.disabled();
  }

  public setTank(tank: IOilOperationsTank): void {
      this.selectedTank = tank;
  }

  public setProduct(product: IOilOperationsProduct): void {
      this.selectedProduct = product;
  }

  public active(itemActive: string): void {
    Object.keys(this.filter).forEach(key => {
      if (key === itemActive) {
        this.filter[key] = true;
      } else {
        this.filter[key] = false;
      }
    });
  }

  public disabled(): void {
    Object.keys(this.filter).forEach(item => {
      this.filter[item] = false;
    });
  }
}
