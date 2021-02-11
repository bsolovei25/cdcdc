import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';
import { IDocumentsScan } from 'src/app/dashboard/models/oil-document.model';

@Component({
    selector: 'evj-documents-scans-report',
    templateUrl: './documents-scans-report.component.html',
    styleUrls: ['./documents-scans-report.component.scss'],
})
export class DocumentsScansReportComponent implements OnInit {
    @Output()
    private deleteItem: EventEmitter<IDocumentsScan> = new EventEmitter<IDocumentsScan>();

    @Output()
    private activeItem: EventEmitter<IDocumentsScan> = new EventEmitter<IDocumentsScan>();

    @Input()
    public data: IDocumentsScan;

    @Input()
    public isActive: boolean = false;

    constructor(public oilDocumentService: DocumentsScansService, public snackBar: SnackBarService) {}

    public ngOnInit(): void {}

    public onClick(): void {
        this.activeItem.emit(this.data);
    }

    public onDeleteClick(): void {
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить файл?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.deleteItem.emit(this.data),
            closeFunction: () => {
                this.oilDocumentService.closeAlert();
            },
        };
        this.oilDocumentService.alertWindow$.next(windowsParam);
    }
}
