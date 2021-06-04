import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    AfterViewChecked, ChangeDetectorRef, ViewContainerRef, TemplateRef, AfterViewInit, OnDestroy
} from '@angular/core';
import { WidgetService } from '@dashboard/services/widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';

import { TITLES_OF_TABLE } from '@widgets/SOU/sou-streams/config';
import { TABLE_CELLS } from '@widgets/SOU/sou-streams/mock';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';


@Component({
    selector: 'evj-sou-streams',
    templateUrl: './sou-streams.component.html',
    styleUrls: ['./sou-streams.component.scss']
})
export class SouStreamsComponent extends WidgetPlatform implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

    public titlesOfTable: { name: string, bigBlock?: boolean }[] = TITLES_OF_TABLE;
    public tableRows: {} = TABLE_CELLS;

    public isReservoirTrendOpen: boolean = false;

    public heightOfTable: string = '400px';
    public heightOfViewPort: string = '335px';
    public widthOfTable: string = '1943.2px';
    public widthOfGraphic: number = 70;

    @ViewChild('overlayCustom') dialogTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal;

    constructor(
        private cdr: ChangeDetectorRef,
        protected widgetService: WidgetService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {
        this.portal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
        console.log(this.dialogTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    overlayDetach(): void {
        this.overlayRef.detach();
    }

    ngOnDestroy(): void {
        this.overlayRef.dispose();
    }

    @ViewChild('widget') child: ElementRef;

    ngAfterViewChecked(): void {
        this.heightOfTable = this.child.nativeElement.clientHeight - 40 + 'px';
        this.heightOfViewPort = this.child.nativeElement.clientHeight - 115 + 'px';

        if (this.child.nativeElement.clientWidth >= 1943.2) {
            const graphic = this.child.nativeElement.clientWidth - 1943.2;
            this.widthOfTable = this.child.nativeElement.clientWidth + 'px';
            this.widthOfGraphic = 70 + graphic;
        } else {
            this.widthOfTable = '1943.2px';
        }
        this.cdr.detectChanges();
    }

    public openReservoirTrend(): void {
        this.isReservoirTrendOpen = true;
        console.log(window);
    }

    public closeSmartTrend(): void {
        this.isReservoirTrendOpen = false;
        this.overlayDetach();
    }

    openDialog(): void {
        this.overlayRef?.attach(this.portal);
    }

    protected dataHandler(ref: unknown): void {
    }
}
