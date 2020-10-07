import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { ReportsService } from '../../services/widgets/reports.service';

@Component({
  selector: 'evj-custom-report-properties-reference',
  templateUrl: './custom-report-properties-reference.component.html',
  styleUrls: ['./custom-report-properties-reference.component.scss']
})
export class CustomReportPropertiesReferenceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
  @ViewChild('propertiesRefereneTable') public testBlock: ElementRef;
  @ViewChild('customOptions') public testBlock2: ElementRef;

  public static itemCols: number = 32;
  public static itemRows: number = 15;

  public static minItemCols: number = 27;
  public static minItemRows: number = 15;

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

  public isLoading: boolean = false;

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
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event): void {
    this.setStyleScroll();
  }

  protected dataConnect(): void {
    super.dataConnect();
    this.subscriptions.push(
      this.getReference(),
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  setStyleScroll(): void {
    const rightScroll = document.getElementById('rightScrollReportRef');
    const leftScroll = document.getElementById('leftScrollReportRef');

    if (rightScroll) {
      if (rightScroll.scrollHeight !== rightScroll.clientHeight) {
        rightScroll.style.cssText = "margin-left: 5px; width: calc(100% - 5px);";
      } else {
        rightScroll.style.cssText = "margin-left: 10px; width: calc(100% - 10px);";

      }
    }

    if (leftScroll) {
      if (leftScroll.scrollHeight !== leftScroll.clientHeight) {
        leftScroll.style.cssText = "margin-right: 0px; width: calc(100% - 5px);";
      } else {
        leftScroll.style.cssText = "margin-right: 0px; width: calc(100% - 10px);";
      }
    }
  }

  protected dataHandler(ref: any): void {
    //this.data = ref.chartItems;
  }

  getReference(): any {
    return this.reportService.getCustomOptions().subscribe((data) => {
      this.datas = data;
      this.data = this.datas;
      this.setStyleScroll();
    });
  }

  onClickReference(data, index): void {
    this.idReferenceClick = data.id;
    this.indexColumn = index;
    this.setStyleScroll();
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

    this.isLoading = true;
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить файл-шаблон?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.reportService.deleteCustomOptions(item.id).subscribe(ans => {
        this.getReference();
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
      }),
      closeFunction: () => {
        this.reportService.closeAlert();
        this.isLoading = false;
      }
    };
    this.reportService.alertWindow$.next(windowsParam);
  }

  onEdit(item) {
    item.openEdit = true;
  }

  editOptions(item) {
    this.reportService.putCustomOptions(item).subscribe(ans => {
      this.getReference();
    });
  }

}
