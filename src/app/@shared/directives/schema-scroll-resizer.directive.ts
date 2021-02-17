import { Directive, ElementRef, HostListener, Input } from '@angular/core';

interface IWheelEvent {
    wheelDelta?: number;
    offsetX?: number;
    offsetY?: number;
    pageX?: number;
    pageY?: number;
}

@Directive({
    selector: '[evjSchemaScrollResizer]',
})
export class SchemaScrollResizerDirective {
    @Input() set scaleElement(element: ElementRef) {
        const stopEvents: string[] = ['mouseleave', 'mouseup'];
        let currentTranslate: {
            x: number;
            y: number;
        } = {
            x: 0,
            y: 0,
        };
        element?.nativeElement.addEventListener('mousedown', (e: IWheelEvent) => {
            const mouseX = e.pageX - currentTranslate.x;
            const mouseY = e.pageY - currentTranslate.y;
            const container = element.nativeElement;
            container.style.setProperty('cursor', 'grabbing');
            let currentTranslateLocal: {
                x: number;
                y: number;
            } = currentTranslate;
            const onMouseMove = (event: IWheelEvent) => {
                const x = event.pageX;
                const y = event.pageY;
                currentTranslateLocal = {
                    x: x - mouseX,
                    y: y - mouseY,
                };
                container.style.setProperty(
                    'transform',
                    `translate(${currentTranslateLocal.x}px, ${currentTranslateLocal.y}px)`
                );
            };

            stopEvents.forEach((item) => {
                container.addEventListener('mousemove', onMouseMove);
                container.addEventListener(item, () => {
                    container.style.setProperty('cursor', 'grab');
                    container.removeEventListener('mousemove', onMouseMove);
                    currentTranslate = currentTranslateLocal;
                });
            });
        });
    }
    private scale: number = 1;

    constructor(public el: ElementRef) {}

    @HostListener('mousewheel', ['$event']) onResize(e: IWheelEvent): void {
        if (e.wheelDelta > 0) {
            this.scale *= 1.05;
            this.el.nativeElement.style.setProperty('transform-origin', `${e.pageX}px ${e.pageY}px`);
        } else {
            this.scale /= 1.05;
            this.scale = this.scale < 1 ? 1 : this.scale;
        }
        this.el.nativeElement.style.setProperty('transform', `scale(${this.scale})`);
    }
}
