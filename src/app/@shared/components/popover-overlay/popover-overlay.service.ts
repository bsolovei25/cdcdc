import { Injectable, Injector } from '@angular/core';
import {
    Overlay,
    ConnectionPositionPair,
    PositionStrategy,
    OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverRef, PopoverContent } from './popover-overlay.ref';
import { PopoverOverlayComponent } from './popover-overlay.component';

export type PopoverParams<T> = {
    width?: string | number;
    height?: string | number;
    position?: 'start' | 'end' | 'center';
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

    public open<T>({origin, content, data, width, height, position}: PopoverParams<T>): PopoverRef<T> {
        const overlayRef = this.overlay.create(this.getOverlayConfig({origin, width, height, position}));
        const popoverRef = new PopoverRef<T>(overlayRef, content, data);

        const injector = Injector.create({providers: [{ provide: PopoverRef, useValue: popoverRef }], parent: this.injector, name: ''});
        overlayRef.attach(new ComponentPortal(PopoverOverlayComponent, null, injector));

        return popoverRef;
    }

    private getOverlayConfig({origin, width, height, position}: {origin: HTMLElement, width: string | number, height: string | number; position?: 'start' | 'end' | 'center'}): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: true,
            width,
            height,
            backdropClass: 'popover-backdrop',
            positionStrategy: this.getOverlayPosition(origin, position),
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private getOverlayPosition(origin: HTMLElement, position: 'start' | 'end' | 'center'): PositionStrategy {
        return this.overlay.position()
            .flexibleConnectedTo(origin)
            .withPositions(this.getPositions(position))
            .withFlexibleDimensions(false)
            .withPush(false);
    }

    private getPositions(position: 'start' | 'end' | 'center' = 'center'): ConnectionPositionPair[] {
        return [
            {
                originX: 'center',
                originY: 'top',
                overlayX: position,
                overlayY: 'bottom'
            },
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: position,
                overlayY: 'top',
            },
        ];
    }
}
