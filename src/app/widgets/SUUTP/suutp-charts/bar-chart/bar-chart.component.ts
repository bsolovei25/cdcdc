import {
    Component,
    ChangeDetectionStrategy, Input
} from "@angular/core";

interface ISUUTPBarChart {
    value: number,
    date: string
}

@Component({
  selector: 'evj-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BarChartComponent {
    @Input() public readonly data: ISUUTPBarChart[];
}
