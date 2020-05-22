import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';
import { MatDialog } from '@angular/material/dialog';
import { TanksTableComponent } from '../tank-calibration-table/tanks-table/tanks-table.component';
import { DocumentViewerFullscreenComponent } from './document-viewer-fullscreen/document-viewer-fullscreen.component';
import { stringify } from 'querystring';

export interface IDocumentViewer {
    src: string;
    page: number;
    search: string;
}

@Component({
  selector: 'evj-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild(PdfViewerComponent) pdfViewport: PdfViewerComponent;

    public src: string;
    public page: number;
    public totalPages: number;
    public isLoading: boolean;
    public search: string;

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

    public static itemCols: number = 16;
    public static itemRows: number = 15;
    public static minItemCols: number = 16;
    public static minItemRows: number = 12;

    constructor(
        private dialog: MatDialog,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.isLoading = true;
        setTimeout(() =>
            this.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf', 2000);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.resizePdfViewport();
    }

    public afterLoadComplete(pdfData: any): void {
        this.isLoading = false;
        this.search = '';
        this.totalPages = pdfData.numPages;
        this.page = 1;
    }

    public scaleDocument(isBigger: boolean): void {
        const scaler: number = 0.1;
        if (isBigger) {
            this.scalePercent += scaler;
        } else {
            this.scalePercent -= scaler;
        }
    }

    public searchInPDF(stringToSearch: string): void {
        this.pdfViewport?.pdfFindController?.executeCommand('find', {
            caseSensitive: false,
            findPrevious: undefined,
            highlightAll: true,
            phraseSearch: true,
            query: stringToSearch,
        });
    }

    public resizePdfViewport(): void {
        this.pdfViewport?.onPageResize();
    }

    protected dataHandler(ref: any): void {
    }

    openFullScreen(): void {
        const documentParams: IDocumentViewer = {
            src: this.src,
            page: this.page,
            search: this.search,
        };
        const dialogRef = this.dialog
            .open(DocumentViewerFullscreenComponent, {
                data: documentParams,
                autoFocus: true,
            });
    }
}
