import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {CmidDynamicsOfMetricsChangePageType} from "@widgets/CMID/cmid-dynamics-of-metrics-change/enums/cmid-dynamics-of-metrics-change.enums";

@Component({
  selector: 'evj-cmid-dynamics-of-metrics-change-header',
  templateUrl: './cmid-dynamics-of-metrics-change-header.component.html',
  styleUrls: ['./cmid-dynamics-of-metrics-change-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidDynamicsOfMetricsChangeHeaderComponent {
    @Input() page: CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS = null;
    @Output() changePage: EventEmitter<CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS> = new EventEmitter<CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS>();
    public pageTypes = CmidDynamicsOfMetricsChangePageType;

    selectionChange(pageType: CmidDynamicsOfMetricsChangePageType.DYNAMICS | CmidDynamicsOfMetricsChangePageType.STATISTICS): void {
        this.changePage.emit(pageType);
    }
}
