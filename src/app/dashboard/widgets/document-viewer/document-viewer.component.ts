import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';

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

    private _scalePercent: number;
    public set scalePercent(value: number) {
        const max = 1;
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
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.isLoading = true;
        setTimeout(() => this.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf', 3000);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        this.resizePdfViewport();
    }

    public afterLoadComplete(pdfData: any): void {
        this.isLoading = false;
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

    public search(stringToSearch: string): void {
        this.pdfViewport.pdfFindController.executeCommand('find', {
            caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
        });
    }

    public resizePdfViewport(): void {
        this.pdfViewport?.onPageResize();
    }

    protected dataHandler(ref: any): void {
    }
}
