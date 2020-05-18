import { Component, OnInit, HostListener, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { DocumentsScansService } from '../../services/oil-control-services/documents-scans.service';

export interface IDocumentsScans {
  id: number;
  name: string;
  date: string; /// Date
  isActive?: boolean;
}

@Component({
  selector: 'evj-documents-scans',
  templateUrl: './documents-scans.component.html',
  styleUrls: ['./documents-scans.component.scss']
})

export class DocumentsScansComponent extends WidgetPlatform implements OnInit, OnDestroy {
  public static itemCols: number = 16;
  public static itemRows: number = 15;
  public static minItemCols: number = 16;
  public static minItemRows: number = 12;

  public data: IDocumentsScans[] = [
    {
      id: 1,
      name: "ЧЕТО ТАМ ПФ1.pdf",
      date: "25.02.2019 12:23",
      isActive: false,
    },
    {
      id: 2,
      name: "ЧЕТО ТАМ ПФ2.pdf11111111111111111111111111111111111111111111111111111111111111111111111111",
      date: "26.02.2019 12:23",
      isActive: false,
    },
    {
      id: 3,
      name: "ЧЕТО ТАМ ПФ3.pdf",
      date: "27.02.2019 12:23",
      isActive: false,
    },
    {
      id: 4,
      name: "ЧЕТО ТАМ ПФ3.pdf",
      date: "27.02.2019 12:23",
      isActive: false,
    },
    {
      id: 5,
      name: "ЧЕТО ТАМ ПФ3.pdf",
      date: "27.02.2019 12:23",
      isActive: false,
    },
    {
      id: 6,
      name: "ЧЕТО ТАМ ПФ3.pdf",
      date: "27.02.2019 12:23",
      isActive: false,
    },
  ];

  constructor(
    public widgetService: WidgetService,
    public oilDocumentService: DocumentsScansService,
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
    const scroll = document.getElementById('scrollDocumentsScans');
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

  active(event: number): void {
    this.data.forEach(e => {
      if (e.id === event) {
        e.isActive = !e.isActive;
      } else {
        e.isActive = false;
      }
    });
  }

  delete(eventId: number): void {
    const indexItem = this.data.findIndex(e => e.id === eventId);
    if (indexItem !== -1) {
      this.data.splice(indexItem, 1);
    }
  }

}
