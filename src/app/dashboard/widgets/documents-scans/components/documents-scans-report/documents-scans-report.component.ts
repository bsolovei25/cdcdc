import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDocumentsScans } from '../../documents-scans.component';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { ReportServerConfiguratorService } from 'src/app/dashboard/services/report-server-configurator.service';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';

@Component({
  selector: 'evj-documents-scans-report',
  templateUrl: './documents-scans-report.component.html',
  styleUrls: ['./documents-scans-report.component.scss']
})
export class DocumentsScansReportComponent implements OnInit {
  @Output() private deleteItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() public dataItem: IDocumentsScans;
  @Input() public data: IDocumentsScans[];


  constructor(
    public oilDocumentService: DocumentsScansService,
    public snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  active(): void {
    this.data.forEach(e => {
      if (e.id === this.dataItem.id) {
        e.isActive = !e.isActive;
      } else {
        e.isActive = false;
      }
    });
  }

  delete(): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить файл?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.deleteItem.emit(this.dataItem.id),
      cancelFunction: () => {
        this.oilDocumentService.closeAlert();
      }
    };
    this.oilDocumentService.alertWindow$.next(windowsParam);
  }


}
