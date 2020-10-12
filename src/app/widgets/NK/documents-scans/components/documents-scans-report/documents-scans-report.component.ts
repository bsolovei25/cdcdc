import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';
import { IDocumentsScans } from 'src/app/dashboard/models/oil-document.model';

@Component({
  selector: 'evj-documents-scans-report',
  templateUrl: './documents-scans-report.component.html',
  styleUrls: ['./documents-scans-report.component.scss']
})
export class DocumentsScansReportComponent implements OnInit {
  @Output() private deleteItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() private activeItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() public data: IDocumentsScans;

  constructor(
    public oilDocumentService: DocumentsScansService,
    public snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  active(): void {
    this.activeItem.emit(this.data.id);
  }

  delete(): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить файл?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.deleteItem.emit(this.data.id),
      closeFunction: () => {
        this.oilDocumentService.closeAlert();
      }
    };
    this.oilDocumentService.alertWindow$.next(windowsParam);
  }

}
