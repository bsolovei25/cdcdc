import {
    Injectable,
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    ElementRef,
    ComponentRef,
} from '@angular/core';
import { TooltipComponent } from '../tooltip.component';
import { ThrowStmt } from '@angular/compiler';

export interface TooltipModel {
    elem?: ElementRef;
    title: string;
    top?: number;
    left?: number;
}

@Injectable({
    providedIn: 'root',
})
export class TooltipService {
    private ref: ComponentRef<TooltipComponent>;

    private top: number;
    private left: number;

    private height: number;
    private width: number;

    constructor(
        private _factoryResolver: ComponentFactoryResolver,
        private _injector: Injector,
        private _appRef: ApplicationRef
    ) {}

    public close(): void {
        this.ref?.destroy();
    }

    public openPopup(object: TooltipModel): void {
        const tooltipComponent = this._factoryResolver.resolveComponentFactory(TooltipComponent);
        const tooltipComponentRef = tooltipComponent.create(this._injector);

        this.top = object.elem.nativeElement.getBoundingClientRect().top;
        this.left = object.elem.nativeElement.getBoundingClientRect().left;

        this.height = object.elem.nativeElement.getBoundingClientRect().height;
        this.width = object.elem.nativeElement.getBoundingClientRect().width;

        this._appRef.attachView(tooltipComponentRef.hostView);

        this.ref = tooltipComponentRef;

        const obj: TooltipModel = {
            title: object.title,
            top: this.height - 25,
            left: this.width / 4,
        };

        tooltipComponentRef.instance.value = obj;

        object.elem.nativeElement.firstElementChild.appendChild(tooltipComponentRef.location.nativeElement);
    }
}
