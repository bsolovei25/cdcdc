import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DocumentCodingService } from 'src/app/dashboard/services/oil-control-services/document-coding.service';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { IDocumentsScan } from '../../../../../dashboard/models/oil-document.model';
import { FormControl } from '@angular/forms';
import { IOilOperationsProduct, IOilOperationsTank } from '../../../../../dashboard/models/oil-operations';

export interface IEncodedFileToSave {
    productId: number;
    tankId: string;
    importedFileId: string;
    qualityDocumentId: number;
    passportDate: string;
}

@Component({
    selector: 'evj-document-coding-menu',
    templateUrl: './document-coding-menu.component.html',
    styleUrls: ['./document-coding-menu.component.scss'],
})
export class DocumentCodingMenuComponent implements OnInit, OnChanges {
    public date: Date;

    @Input()
    public document: IDocumentsScan | null = null;

    @Input()
    public tank: IOilOperationsTank | null = null;

    @Input()
    public product: IOilOperationsProduct | null = null;

    public passportId: FormControl = new FormControl();

    public passportDate: FormControl = new FormControl();

    constructor(
        public oilService: DocumentCodingService,
        public snackBar: SnackBarService,
        private documentCodingService: DocumentCodingService
    ) {}

    public ngOnInit(): void {
        this.passportId.setValue('0');
        this.passportDate.setValue(new Date());
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.passportDate.setValue(this.document ? new Date(this.document.date) : new Date());
    }

    public saveFile(): Promise<void> {
        if (!this.tank || !this.document || !this.product) {
            this.snackBar.openSnackBar('Резервуар, Продукт и Документ - должны быть выбраны');
            return;
        }
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите сохранить файл?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                const file: IEncodedFileToSave = {
                    productId: this.product.id,
                    tankId: this.tank.id,
                    importedFileId: this.document.id === 0 ? this.document.externalId : this.document.id.toString(),
                    qualityDocumentId: parseInt(this.passportId.value, 0),
                    passportDate: new Date(this.passportDate.value).toISOString(),
                };
                const result = this.documentCodingService.passportSave(file);
                result.catch((error) => {
                    this.snackBar.openSnackBar('Ошибка ' + error.code, 'error');
                });
                result.then((response) => {
                    this.document = null;
                    this.product = null;
                    this.tank = null;
                    this.documentCodingService.savedPassport.next(file);
                    this.snackBar.openSnackBar('Файл сохранен');
                });
            },
            closeFunction: () => this.oilService.closeAlert(),
            cancelFunction: () => {},
        };
        this.oilService.alertWindow$.next(windowsParam);
    }
}
