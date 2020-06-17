import { Injectable, Injector } from '@angular/core';
import {
    Overlay,
    ConnectionPositionPair,
    PositionStrategy,
    OverlayConfig,
} from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { PopoverRef, PopoverContent } from './popover-overlay.ref';
import { PopoverOverlayComponent } from './popover-overlay.component';

export type PopoverParams<T> = {
    width?: string | number;
    height?: string | number;
    origin: HTMLElement;
    content: PopoverContent;
    data?: T;
};

@Injectable({
    providedIn: 'root'
})
export class PopoverOverlayService {

    constructor(
        private overlay: Overlay,
        private injector: Injector,
    ) {
    }

    public open<T>({origin, content, data, width, height}: PopoverParams<T>): PopoverRef<T> {
        const overlayRef = this.overlay.create(this.getOverlayConfig({origin, width, height}));
        const popoverRef = new PopoverRef<T>(overlayRef, content, data);

        const injector = this.createInjector(popoverRef, this.injector);
        overlayRef.attach(new ComponentPortal(PopoverOverlayComponent, null, injector));

        return popoverRef;
    }

    public createInjector(popoverRef: PopoverRef, injector: Injector): PortalInjector {
        const tokens = new WeakMap([[PopoverRef, popoverRef]]);
        return new PortalInjector(injector, tokens);
    }

    private getOverlayConfig({origin, width, height}): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: true,
            width,
            height,
            backdropClass: 'popover-backdrop',
            positionStrategy: this.getOverlayPosition(origin),
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private getOverlayPosition(origin: HTMLElement): PositionStrategy {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions())
            .withFlexibleDimensions(false)
            .withPush(false);

        return positionStrategy;
    }

    private getPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom'
            },
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
        ];
    }
}
