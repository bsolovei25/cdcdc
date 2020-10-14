import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { EventsWidgetCategory, ISubcategory } from '../../../../../dashboard/models/events-widget';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-evj-event-categories',
    templateUrl: './evj-event-categories.component.html',
    styleUrls: ['./evj-event-categories.component.scss']
})
export class EvjEventCategoriesComponent implements OnInit {

    public categoryActive: boolean = false;
    private timerHwnd: number;

    overlayRef: OverlayRef;
    activeCategory: number = 0;
    @ViewChild('overlayTemplate') overlayTemplate: CdkPortal;
    @ViewChild(CdkOverlayOrigin, { static: false }) private overlayOrigin: CdkOverlayOrigin;

    @Input() data: EventsWidgetCategory;
    @Input() subCategoriesSelected: SelectionModel<number>;

    @Output()
    public categoryClick: EventEmitter<EventsWidgetCategory> =
        new EventEmitter<EventsWidgetCategory>();
    @Output()
    public toggleSubCategory: EventEmitter<number> = new EventEmitter<number>();

    constructor(public overlay: Overlay,
                public viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
    }

    onCLickItem(data: EventsWidgetCategory): void {
        this.categoryClick.emit(data);
    }

    openOverlay(): void {
        this.resetSetTimeout();
        if (this.data?.subCategories?.length > 1 && !this.activeCategory) {
            this.activeCategory = this.data.id;
            this.openTemplateOverlay();
        }
        if (this.activeCategory !== this.data.id) {
            this.overlayRef?.dispose();
        }
    }

    resetSetTimeout(): void {
        clearTimeout(this.timerHwnd);
        this.timerHwnd = 0;
    }

    closeOverlay(): void {
        if (!this.timerHwnd) {
            this.timerHwnd = window.setTimeout(() => {
                this.overlayRef?.dispose();
                this.activeCategory = 0;
            }, 150);
        }
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
        this.overlayRef = this.overlay.create(overlayConfig);
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });

        this.overlayRef.attach(this.overlayTemplate);
    }

    toggle(id: number): void {
        this.toggleSubCategory.emit(id);
        if (!this.data.isActive) {
            this.categoryClick.emit(this.data);
        }
    }

}
