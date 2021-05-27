import { Component, ChangeDetectionStrategy, Input, OnChanges } from "@angular/core";

@Component({
  selector: 'evj-bar-column',
  templateUrl: './bar-column.component.html',
  styleUrls: ['./bar-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarColumnComponent implements OnChanges {
    @Input() barData: { value: number, date: string }

    public linesPercents: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    ngOnChanges(): void {
      this.convertDate(this.barData.date)
    }

    public convertDate(dateStr:  string): Date {
        return new Date(dateStr);
    }
}
