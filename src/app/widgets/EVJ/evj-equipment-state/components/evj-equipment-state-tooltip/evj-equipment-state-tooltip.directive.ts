import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { EquipmentStateTooltipComponent } from './evj-equipment-state-tooltip.component';
import { IEquipmentStateComment } from '@dashboard/models/EVJ/equipment-state';

@Directive({ selector: '[equipment-state-tooltip]' })
export class EquipmentStateTooltipDirective implements OnInit {
    @Input() comment: IEquipmentStateComment;

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.createOverlay();
    }

    @HostListener('mouseout')
    outListener(): void {
       this.overlayRef.detach();
    }

    @HostListener('mouseenter')
    enterListener(): void {
        const tooltipRef = this.overlayRef.attach(new ComponentPortal(EquipmentStateTooltipComponent));
        tooltipRef.instance.comment = this.comment;
    }

    private createOverlay(): void {
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: 3,
            }]);
        this.overlayRef = this.overlay.create({ positionStrategy });
    }
}
