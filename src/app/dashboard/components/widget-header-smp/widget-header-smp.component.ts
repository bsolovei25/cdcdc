import { Component, Input, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'evj-widget-header-smp',
  templateUrl: './widget-header-smp.component.html',
  styleUrls: ['./widget-header-smp.component.scss']
})
export class WidgetHeaderSmpComponent implements OnInit {
    @Input() uniqId: string;
    constructor(
        private widgetService: WidgetService
    ) { }

    ngOnInit(): void { }

    public closeWidget(): void {
        this.widgetService.removeItemService(this.uniqId);
    }

}
