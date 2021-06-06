import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { IComplexData, IComplexIndicator } from "@widgets/SUUTP/suutp-complexes/complexes.interface";
import { IKpeGaugeChartPage } from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

@Component({
  selector: 'evj-complexes-item',
  templateUrl: './complexes-item.component.html',
  styleUrls: ['./complexes-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplexesItemComponent {
    @Input() title: string;
    @Input() indicators: IComplexIndicator[];
    @Input() chartPage: IKpeGaugeChartPage;
    @Input() data: IComplexData[];
}
