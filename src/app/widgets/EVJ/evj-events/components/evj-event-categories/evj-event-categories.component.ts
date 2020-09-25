import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { EventsWidgetCategory } from '../../../../../dashboard/models/events-widget';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';


@Component({
    selector: 'evj-evj-event-categories',
    templateUrl: './evj-event-categories.component.html',
    styleUrls: ['./evj-event-categories.component.scss']
})
export class EvjEventCategoriesComponent implements OnInit {

    public subCategory: string[] = [];

    public categoryActive: boolean = false;

    overlayRef: OverlayRef;
    @ViewChild('overlayTemplate') overlayTemplate: TemplatePortalDirective;
    @ViewChild(CdkOverlayOrigin, { static: false }) private overlayOrigin: CdkOverlayOrigin;

    @Input() data: EventsWidgetCategory;

    @Output()
    public categoryClick: EventEmitter<EventsWidgetCategory> =
        new EventEmitter<EventsWidgetCategory>();

    @Output()
    public categoryDeleteClick: EventEmitter<number> = new EventEmitter<number>();

    constructor(public overlay: Overlay,
                public viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
    }

    onCLickItem(data: EventsWidgetCategory): void {
        if (!data.isActive && this.subCategory.length) {
            this.openTemplateOverlay();
        }
        this.categoryClick.emit(data);

    }

    // Переход в систему источник
    public onClickUrl(e: Event, url: string): void {
        e.stopPropagation();
        window.open(url);
    }

    openTemplateOverlay(): void {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOrigin.elementRef)
            .withFlexibleDimensions(true)
            .withPositions([{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: -10
            }]);
        const overlayConfig = new OverlayConfig({
            positionStrategy
        });

        overlayConfig.hasBackdrop = true;
        this.overlayRef = this.overlay.create(overlayConfig);
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });

        this.overlayRef.attach(this.overlayTemplate);
    }

}
