import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";

@Component({
    selector: 'evj-ec-widget-factor-analysis-header',
    templateUrl: './ec-widget-factor-analysis-header.component.html',
    styleUrls: ['./ec-widget-factor-analysis-header.component.scss'],
})
export class EcWidgetFactorAnalysisHeaderComponent implements OnInit, OnChanges {
    @Input() page: 'bar' | 'chart' = null;
    @Input() reference: { id: string; name: string }[] = [];
    @Output() changePage: EventEmitter<'bar' | 'chart'> = new EventEmitter<'bar' | 'chart'>();

    constructor(public ecWidgetService: EcWidgetService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {}

    selectionChange(e: string): void {
        this.ecWidgetService.selectedItem$.next(e);
    }
}
