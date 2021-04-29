import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICmidCloseReasonBar } from '../../cmid-close-reason.interface';

@Component({
    selector: 'cmid-close-reason-groups-chart',
    templateUrl: './cmid-close-reason-groups-chart.component.html',
    styleUrls: ['./cmid-close-reason-groups-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CmidCloseReasonGroupsChartComponent {
    @Input() public reasonGroups: ICmidCloseReasonBar[];
}
