import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cmid-close-reason-vpr-chart',
    templateUrl: './cmid-close-reason-vpr-chart.component.html',
    styleUrls: ['./cmid-close-reason-vpr-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidCloseReasonVprChartComponent {
    @Input() public vprValue: number;
}
