import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';
import { IDocumentsScan } from 'src/app/dashboard/models/oil-document.model';


@Component({
    selector: 'evj-documents-scans',
    templateUrl: './documents-scans.component.html',
    styleUrls: ['./documents-scans.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsScansComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public data: IDocumentsScan[] = [];

    // public activeRow: Map<number | string, boolean> = new Map<number | string, boolean>();
    public activeRowId: string | null = null;

    constructor(
        public cdRef: ChangeDetectorRef,
        public widgetService: WidgetService,
        public oilDocumentService: DocumentsScansService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.cdRef.detach();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.getData();
    }

    public async getData(): Promise<void> {
        this.data = await this.oilDocumentService.getDocumentList();
        this.cdRef.detectChanges();
    }

    private async getDocument(id: string): Promise<void> {
        this.oilDocumentService.documentScansLoader$.next(true);
        try {
            const url = await this.oilDocumentService.getDocumentView(id);
            this.oilDocumentService.currentDocumentUrl$.next(url);

            const documentInfo = this.getPassportInfo(id);
            this.oilDocumentService.currentDocument$.next(documentInfo);
        } catch (e) {
            console.error(e);
        } finally {
            this.oilDocumentService.documentScansLoader$.next(false);
        }
    }

    private getPassportInfo(id: string): IDocumentsScan | null {
        const info = this.data.find(scan => scan.id === 0 ? scan.externalId === id : scan.id.toString() === id);
        return info ? info : null;
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
    }

    public setStyleScroll(): void {
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

    public isItemActive(scan: IDocumentsScan): boolean {
        const id = scan.id !== 0 ? scan.id : scan.externalId;
        return this.activeRowId === id;
    }

    public active(scan: IDocumentsScan): void {
        const id: string = scan.id !== 0 ? scan.id.toString() : scan.externalId;
        if (this.activeRowId === id.toString()) {
            this.activeRowId = null;
            this.oilDocumentService.currentDocumentUrl$.next(null);
            this.oilDocumentService.currentDocument$.next(null);
        } else {
            this.getDocument(id);
            this.activeRowId = id.toString();
        }
    }

    async delete(scan: IDocumentsScan): Promise<void> {
        this.oilDocumentService.documentScansLoader$.next(true);
        try {
            await this.oilDocumentService.deleteDocument(scan.id === 0 ? scan.externalId : scan.id.toString());
            const indexItem = this.data.findIndex((e) => e.id === scan.id);
            if (indexItem !== -1) {
                this.data.splice(indexItem, 1);
            }
            this.oilDocumentService.currentDocumentUrl$.next(null);
            this.oilDocumentService.currentDocument$.next(null);
        } catch (e) {
            console.error(e);
        } finally {
            this.oilDocumentService.documentScansLoader$.next(false);
        }
    }
}
