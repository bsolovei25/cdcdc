import { Directive, ElementRef, HostListener, Input, Host } from '@angular/core';
import { TooltipService, TooltipModel } from '../service/tooltip.service';

@Directive({
    selector: '[appTooltip]',
})
export class TooltipDirective {
    @Input() textTooltip: string;

    public tooltipFlag: boolean = false;

    constructor(private el: ElementRef, private tooltipService: TooltipService) {}

    @HostListener('mouseenter', ['$event']) onMouseEnter(event: any): void {
        if (!this.tooltipFlag) {
            this.closeTooltip();
            this.tooltipFlag = true;
            this.openTooltip(this.textTooltip);
        }
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(event: any): void {
        if (event.toElement?.className !== 'tooltip' && this.tooltipFlag) {
            this.tooltipFlag = false;
            this.closeTooltip();
        }
    }

    @HostListener('wheel') onScroll(): void {
        this.closeTooltip();
        this.tooltipFlag = false;
    }

    private openTooltip(text: string): void {
        const object: TooltipModel = {
            elem: this.el,
            title: text,
        };
        this.tooltipService.openPopup(object);
    }

    private closeTooltip(): void {
        this.tooltipService.close();
    }
}
