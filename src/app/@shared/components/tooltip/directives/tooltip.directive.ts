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

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: any): void {
    if (event.fromElement?.className !== 'tooltip') {
      this.openTooltip(this.textTooltip);
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any): void {
    if (event.toElement?.className !== 'tooltip') {
      this.closeTooltip();
    }
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
