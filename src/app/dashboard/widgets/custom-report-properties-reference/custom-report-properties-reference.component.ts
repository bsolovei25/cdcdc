import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'evj-custom-report-properties-reference',
  templateUrl: './custom-report-properties-reference.component.html',
  styleUrls: ['./custom-report-properties-reference.component.scss']
})
export class CustomReportPropertiesReferenceComponent extends WidgetPlatform implements OnInit, OnDestroy {
  @ViewChild('propertiesRefereneTable') public testBlock: ElementRef;
  @ViewChild('customOptions') public testBlock2: ElementRef;

  indexColumn: number = null;
  idReferenceClick: number;

  isClickPushReference: boolean = false;

  isRefInput: boolean = false;
  isLongBlock: boolean = true;

  newRecordInReference: string;

  public data;
  public datas;
  public dataOptions;
  public blockOut = [];

  options = [
    { object: "1", }
  ]


  constructor(
    public widgetService: WidgetService,
    public reportService: ReportsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
    this.widgetIcon = 'reference';
  }

  ngOnInit(): void {
    super.widgetInit();
    this.subscriptions.push(
      this.getReference(),
    );
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event) {
    this.blockNeed();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  protected dataHandler(ref: any): void {
    //this.data = ref.chartItems;
  }

  blockNeed(): void {
    // this.blockOut = [];
    // if (this.testBlock2.nativeElement !== undefined) {
    //   const heihtOut = (this.testBlock.nativeElement.clientHeight - this.testBlock2.nativeElement.clientHeight) / 40;
    //   for (let i = 0; i < heihtOut - 1; i++) {
    //     this.blockOut.push(i);
    //   }
    // }
  }


  getReference() {
    return this.reportService.getCustomOptions().subscribe((data) => {
      this.datas = data;
      this.data = this.datas;
    });
  }

  onClickReference(data, index) {
    this.idReferenceClick = data.id;
    this.indexColumn = index;
    this.blockNeed();

    // this.reportService.getColumns(this.idReferenceClick).subscribe((datas) => {
    //   data.columns = datas;
    //   
    // });
  }

  onPushReference(): void {
    this.isClickPushReference = false;
    let object = {
      name: this.newRecordInReference,
      description: "",
      type: "textBox",
      validationRule: "string",
      isRequired: false,
      source: null,
    };
    if (
      this.newRecordInReference.trim().length > 0 &&
      this.newRecordInReference !== undefined
    ) {
      this.reportService.postCustomOptions(object).subscribe((ans) => {
        this.getReference();
      });
      this.newRecordInReference = null;
    }
  }

  onPushBlockInReference(): void {
    this.isClickPushReference = true;
  }

  searchReference(event: any) {
    if (event.key === "Backspace") {
      this.data = this.datas;
    }
    const record = event.currentTarget.value.toLowerCase();
    const filterData = this.data.filter(
      (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
    );

    this.data = filterData;
    if (!event.currentTarget.value) {
      this.data = this.datas;
    }
  }

  deleteReference(item): void {
    this.reportService.deleteCustomOptions(item.id).subscribe(ans => {
      this.getReference();
    });
  }

  onEdit(item) {
    item.openEdit = true;
  }

  editOptions(item) {
    this.reportService.putCustomOptions(item).subscribe(ans => {
      this.getReference();
    })
  }

}