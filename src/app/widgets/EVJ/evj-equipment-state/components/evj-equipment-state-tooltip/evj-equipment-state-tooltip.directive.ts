import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { EquipmentStateTooltipComponent } from './evj-equipment-state-tooltip.component';
import { IEquipmentStateComment } from '@dashboard/models/EVJ/equipment-state';

@Directive({ selector: '[equipment-state-tooltip]' })
export class EquipmentStateTooltipDirective implements OnInit {
    @Input() comment: IEquipmentStateComment;

    public overlayHoverRef = false;

    private overlayRef: OverlayRef;
    private tooltipRef: ComponentRef<EquipmentStateTooltipComponent>;
    private isRefExists: boolean = false;
    private isHovered: boolean = false;

    constructor(
        private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.createOverlay();
    }

    @HostListener('mouseout')
    public hide(): void {
        setTimeout(() => {
            if (!this.overlayHoverRef && !this.isHovered) {
                this.overlayRef.detach();
                this.isRefExists = false;
            } else {
                this.isRefExists = true;
            }
        })
        this.isHovered = false;
    }

    @HostListener('mouseenter')
    private show(): void {
        setTimeout(() => {
            if (!this.isRefExists) {
                this.tooltipRef = this.overlayRef.attach(new ComponentPortal(EquipmentStateTooltipComponent));
                this.tooltipRef.instance.comment = this.comment;
                this.tooltipRef.instance.overlayRef = this;
            }
            this.isHovered = true;
        })
    }

    private createOverlay(): void {
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: 12,
            }]);
        this.overlayRef = this.overlay.create({ positionStrategy });
    }
}
