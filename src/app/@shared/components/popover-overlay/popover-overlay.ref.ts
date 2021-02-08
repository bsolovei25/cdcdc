import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export type PopoverCloseEvent<T = any> = {
    type: 'backdropClick' | 'close';
    data: T;
};

export type PopoverContent = TemplateRef<any> | Type<any> | string;

export class PopoverRef<T = any> {
    private afterClosed = new Subject<PopoverCloseEvent<T>>();
    public afterClosed$ = this.afterClosed.asObservable();

    constructor(public overlay: OverlayRef, public content: PopoverContent, public data: T) {}

    public close(type: PopoverCloseEvent['type'] = 'close', data?: T): void {
        this.overlay.dispose();
        this.afterClosed.next({
            type,
            data,
        });
        this.afterClosed.complete();
    }
}
