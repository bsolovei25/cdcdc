import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TooltipService, TooltipModel } from '../service/tooltip.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() textTooltip: string;

  constructor(
    private el: ElementRef,
    private tooltipService: TooltipService,
  ) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.openTooltip(this.textTooltip);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.closeTooltip();
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
