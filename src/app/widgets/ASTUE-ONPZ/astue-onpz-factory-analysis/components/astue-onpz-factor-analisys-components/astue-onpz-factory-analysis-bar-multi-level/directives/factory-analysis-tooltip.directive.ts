import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent } from '../components/astue-onpz-factory-analysis-bar-multi-level-tooltip/astue-onpz-factory-analysis-bar-multi-level-tooltip.component';
const POSITIONS_MAP = {
    right: {
        originX: 'center',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'center',
        offsetX: 100,
    },
    bottom: {
        originX: 'center',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'center',
        offsetY: 40,
    },
};
@Directive({
    selector: '[evjFactoryAnalysisTooltip]',
})
export class FactoryAnalysisTooltipDirective implements OnInit, OnDestroy {
    private overlayRef: OverlayRef;
    @Input() title: string;
    @Input() value: number;
    @Input() unit: string;
    @Input() position: string = 'right';

    constructor(
        private overlayPositionBuilder: OverlayPositionBuilder,
        private elementRef: ElementRef,
        private overlay: Overlay
    ) {}

    public ngOnInit(): void {
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([POSITIONS_MAP[this.position]]);

        // Connect position strategy
        this.overlayRef = this.overlay.create({ positionStrategy });
    }

    public ngOnDestroy(): void {
        this.overlayRef.detach();
    }

    @HostListener('mouseenter')
    public show(): void {
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        // Create tooltip portal
        const tooltipPortal = new ComponentPortal(AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent);
        // Attach tooltip portal to overlay
        const tooltipRef: ComponentRef<AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent> = this.overlayRef.attach(
            tooltipPortal
        );

        // Pass content to tooltip component instance
        tooltipRef.instance.position = this.position;
        tooltipRef.instance.title = this.title;
        tooltipRef.instance.value = this.value;
        tooltipRef.instance.unit = this.unit;
    }

    @HostListener('mouseout')
    public hide(): void {
        this.overlayRef.detach();
    }
}
