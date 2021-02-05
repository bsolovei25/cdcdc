import { Component, OnInit, TemplateRef } from '@angular/core';
import { PopoverRef, PopoverContent } from './popover-overlay.ref';

@Component({
    templateUrl: './popover-overlay.component.html',
    styleUrls: ['./popover-overlay.component.scss'],
})
export class PopoverOverlayComponent implements OnInit {
    public renderMethod: 'template' | 'component' | 'text' = 'component';

    public content: PopoverContent;

    public context: { close: PopoverRef };

    constructor(private popoverRef: PopoverRef) {}

    public ngOnInit(): void {
        this.content = this.popoverRef.content;
        if (typeof this.content === 'string') {
            this.renderMethod = 'text';
        }

        if (this.content instanceof TemplateRef) {
            this.renderMethod = 'template';
            this.context = {
                close: this.popoverRef.close.bind(this.popoverRef),
            };
        }
    }
}
