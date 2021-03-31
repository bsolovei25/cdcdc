import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EventsWidgetCategory } from '../../../../../dashboard/models/EVJ/events-widget';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'evj-evj-event-categories',
    templateUrl: './evj-event-categories.component.html',
    styleUrls: ['./evj-event-categories.component.scss'],
})
export class EvjEventCategoriesComponent implements OnInit {
    public categoryActive: boolean = false;
    private timerHwnd: number;

    public overlayRef: OverlayRef;
    public activeCategory: number = 0;

    public limitationsEnabled: boolean = false;
    public allEnabled: boolean = false;
    public allSmpoEnabled: boolean = false;

    @ViewChild('overlayTemplate') public overlayTemplate: CdkPortal;
    @ViewChild(CdkOverlayOrigin, { static: false }) private overlayOrigin: CdkOverlayOrigin;

    @Input()
    public data: EventsWidgetCategory;
    @Input()
    public subCategoriesSelected: SelectionModel<number>;

    @Output()
    public categoryClick: EventEmitter<EventsWidgetCategory> = new EventEmitter<EventsWidgetCategory>();
    @Output()
    public toggleSubCategory: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public onApply: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public onCancel: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public onSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {}

    public onCLickItem(data: EventsWidgetCategory): void {
        this.categoryClick.emit(data);
    }

    public openOverlay(): void {
        this.resetSetTimeout();
        if (this.data?.subCategories?.length > 1 && !this.activeCategory) {
            this.activeCategory = this.data.id;
            this.openTemplateOverlay();
        }
        if (this.activeCategory !== this.data.id) {
            this.overlayRef?.dispose();
        }
    }

    public resetSetTimeout(): void {
        clearTimeout(this.timerHwnd);
        this.timerHwnd = 0;
    }

    public closeOverlay(): void {
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

    public openTemplateOverlay(): void {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOrigin.elementRef)
            .withFlexibleDimensions(true)
            .withPositions([
                {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom',
                    offsetY: -6,
                },
            ]);
        const overlayConfig = new OverlayConfig({
            positionStrategy,
        });
        this.overlayRef = this.overlay.create(overlayConfig);
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });
        this.overlayRef.attach(this.overlayTemplate);
        this.syncItems();
    }

    public toggle(id: number): void {
        this.toggleSubCategory.emit(id);
        this.syncItems();
    }

    public syncItems(): void {
        const selected = this.subCategoriesSelected.selected;
        // удаляем подкатегорию с id 0 в случае если выбраны все подкатегории
        const index = selected.indexOf(0);
        if (index !== -1) {
            selected.splice(index, 1);
        }
        this.allEnabled = selected.length === this.data.subCategories.length;
    }

    public apply(): void {
        this.onApply.emit();
        if (!this.data.isActive) {
            this.categoryClick.emit(this.data);
        }
    }

    public cancel(): void {
        this.closeOverlay();
        this.onCancel.emit();
    }

    public limitationsChange(event: MatCheckboxChange): void {
        this.limitationsEnabled = event.checked;
    }

    public allChange(event: MatCheckboxChange): void {
        this.allEnabled = event.checked;
        this.onSelectAll.emit(this.allEnabled);
    }

    public allSmpoChange(event: MatCheckboxChange): void {
        this.allSmpoEnabled = event.checked;
    }
}
