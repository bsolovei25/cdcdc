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
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import { DocumentsScansService } from 'src/app/dashboard/services/oil-control-services/documents-scans.service';
import { IDocumentsScans } from 'src/app/dashboard/models/oil-document.model';


@Component({
    selector: 'evj-documents-scans',
    templateUrl: './documents-scans.component.html',
    styleUrls: ['./documents-scans.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsScansComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public data: IDocumentsScans[] = [];
    //     {
    //         id: 1,
    //         name: 'ЧЕТО ТАМ ПФ1.pdf',
    //         date: '25.02.2019 12:23',
    //         isActive: false
    //     },
    //     {
    //         id: 2,
    //         name: 'ЧЕТО ТАМ ПФ2.pdf11111111111111111111111111111111111111111111111111111111111111111111111111',
    //         date: '26.02.2019 12:23',
    //         isActive: false
    //     },
    //     {
    //         id: 3,
    //         name: 'ЧЕТО ТАМ ПФ3.pdf',
    //         date: '27.02.2019 12:23',
    //         isActive: false
    //     },
    //     {
    //         id: 4,
    //         name: 'ЧЕТО ТАМ ПФ3.pdf',
    //         date: '27.02.2019 12:23',
    //         isActive: false
    //     },
    //     {
    //         id: 5,
    //         name: 'ЧЕТО ТАМ ПФ3.pdf',
    //         date: '27.02.2019 12:23',
    //         isActive: false
    //     },
    //     {
    //         id: 6,
    //         name: 'ЧЕТО ТАМ ПФ3.pdf',
    //         date: '27.02.2019 12:23',
    //         isActive: false
    //     }
    // ];

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

    private async getDocument(id: number): Promise<void> {
        this.oilDocumentService.documentScansLoader$.next(true);
        try {
            const url = await this.oilDocumentService.getDocumentView(id);
            this.oilDocumentService.currentDocumentUrl$.next(url);
        } catch (e) {
            console.error(e);
        } finally {
            this.oilDocumentService.documentScansLoader$.next(false);
        }
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
        this.data.forEach((e) => {
            if (e.id === event) {
                e.isActive = !e.isActive;
                this.getDocument(e.id);
            } else {
                e.isActive = false;
            }
        });
    }

    async delete(id: number): Promise<void> {
        this.oilDocumentService.documentScansLoader$.next(true);
        try {
            await this.oilDocumentService.deleteDocument(id);
            const indexItem = this.data.findIndex((e) => e.id === id);
            if (indexItem !== -1) {
                this.data.splice(indexItem, 1);
            }
            this.oilDocumentService.currentDocumentUrl$.next(null);
        } catch (e) {
            console.error(e);
        } finally {
            this.oilDocumentService.documentScansLoader$.next(false);
        }
    }
}
