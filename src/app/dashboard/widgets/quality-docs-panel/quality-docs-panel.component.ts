import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';

export interface IQualityDocsRecord {
  id: number;
  numberR: number;
  rR: number;
  pasportId: number;
  date: string; /// DATE
  codeSAP: number;
  product: string[];
  group: string;
  park: string;
  creator: string;
  arm: number;
  blocked?: boolean;
}

@Component({
  selector: 'evj-quality-docs-panel',
  templateUrl: './quality-docs-panel.component.html',
  styleUrls: ['./quality-docs-panel.component.scss']
})
export class QualityDocsPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
  public static itemCols: number = 48;
    public static itemRows: number = 15;
    public static minItemCols: number = 36;
    public static minItemRows: number = 12;

  public data: IQualityDocsRecord[] = [
    {
      id: 1,
      numberR: 4643,
      rR: 422,
      pasportId: 168,
      date: '25.02.2019 12:23',
      codeSAP: 4324325231268,
      product: [
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
      ],
      group: 'СУГ',
      park: 'СУГ',
      creator: 'Иванов И.И. Оператор АСУ ТП',
      arm: 3252516436117
    },
    {
      id: 2,
      numberR: 4643,
      rR: 422,
      pasportId: 168,
      date: '25.02.2019 12:23',
      codeSAP: 4324325231268,
      product: [
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
      ],
      group: 'СУГ',
      park: 'СУГ',
      creator: 'Иванов И.И. Оператор АСУ ТП',
      arm: 3252516436117
    },
    {
      id: 3,
      numberR: 4643,
      rR: 422,
      pasportId: 168,
      date: '25.02.2019 12:23',
      codeSAP: 4324325231268,
      product: [
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
      ],
      group: 'СУГ',
      park: 'СУГ',
      creator: 'Иванов И.И. Оператор АСУ ТП',
      arm: 3252516436117
    },
    {
      id: 4,
      numberR: 4643,
      rR: 422,
      pasportId: 168,
      date: '25.02.2019 12:23',
      codeSAP: 4324325231268,
      product: [
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО',
        'ДТ EВРО сорт F, вид III(ДТ-Е-К5) ДТ ЕВРО'
      ],
      group: 'СУГ',
      park: 'СУГ',
      creator: 'Иванов И.И. Оператор АСУ ТП',
      arm: 3252516436117
    },

  ];

  public isFilter: boolean = false;

  public isTanksInput: boolean = false;
  public isPasportInput: boolean = false;
  public isProductInput: boolean = false;

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

  @HostListener('document:resize', ['$event'])
  OnResize(event): void {
    this.setStyleScroll();
  }

  setStyleScroll(): void {
    const scroll = document.getElementById('scrollQualityDocsPanel');
    if (scroll) {
      if (scroll.scrollHeight !== scroll.clientHeight) {
        scroll.classList.remove('scrollON');
        scroll.classList.add('scrollOFF');
      } else {
        scroll.classList.remove('scrollOFF');
        scroll.classList.add('scrollON');
      }
    }
  }

  openFilter(): void {
    this.isFilter = !this.isFilter;
  }

  searchRecords(event): void {

  }

  closeFilter(event){
    this.isFilter = event;
  }
}
