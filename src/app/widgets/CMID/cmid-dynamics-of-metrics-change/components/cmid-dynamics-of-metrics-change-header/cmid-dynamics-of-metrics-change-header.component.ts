import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {PageType} from "@widgets/CMID/cmid-dynamics-of-metrics-change/enums/pageType";

@Component({
  selector: 'evj-cmid-dynamics-of-metrics-change-header',
  templateUrl: './cmid-dynamics-of-metrics-change-header.component.html',
  styleUrls: ['./cmid-dynamics-of-metrics-change-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidDynamicsOfMetricsChangeHeaderComponent {
    @Input() page: PageType.DYNAMICS | PageType.STATISTICS = null;
    @Output() changePage: EventEmitter<PageType.DYNAMICS | PageType.STATISTICS> = new EventEmitter<PageType.DYNAMICS | PageType.STATISTICS>();
    public pageTypes = PageType;

    selectionChange(pageType: PageType.DYNAMICS | PageType.STATISTICS): void {
        this.changePage.emit(pageType);
    }
}
