import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocumentViewer } from '../document-viewer.component';


@Component({
  selector: 'evj-document-viewer-fullscreen',
  templateUrl: './document-viewer-fullscreen.component.html',
  styleUrls: ['./document-viewer-fullscreen.component.scss']
})
export class DocumentViewerFullscreenComponent implements OnInit {

    @ViewChild(PdfViewerComponent) pdfViewport: PdfViewerComponent;

    public src: string;
    public page: number;
    public search: string;
    public totalPages: number;
    public isLoading: boolean;

    private _scalePercent: number;
    public set scalePercent(value: number) {
        const max = 2;
        const min = 0.2;
        if (value > max) {
            this._scalePercent = max;
        } else if (value < min) {
            this._scalePercent = min;
        } else {
            this._scalePercent = value;
        }
    }
    public get scalePercent(): number {
        if (!this._scalePercent) {
            this._scalePercent = 1;
        }
        return this._scalePercent;
    }

    public static itemCols: number = 20;
    public static itemRows: number = 16;

    constructor(
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public dataRef: IDocumentViewer,
    ) { }

    public ngOnInit(): void {
        this.isLoading = true;
        setTimeout(() =>
            this.src = this.dataRef.src, 2000);
    }

    public afterLoadComplete(pdfData: any): void {
        this.isLoading = false;
        this.totalPages = pdfData.numPages;
        this.page = this.dataRef.page;
        this.search = this.dataRef.search;
        setTimeout(() =>
            this.searchInPdf(this.search), 200);
    }

    public scaleDocument(isBigger: boolean): void {
        const scaler: number = 0.1;
        if (isBigger) {
            this.scalePercent += scaler;
        } else {
            this.scalePercent -= scaler;
        }
        console.log(this.scalePercent);
    }

    public searchInPdf(stringToSearch: string): void {
        this.pdfViewport?.pdfFindController?.executeCommand('find', {
            caseSensitive: false,
            findPrevious: undefined,
            highlightAll: true,
            phraseSearch: true,
            query: stringToSearch,
        });
    }

    public closeFullscreen(): void {
        this.dialogRef.close();
    }
}
