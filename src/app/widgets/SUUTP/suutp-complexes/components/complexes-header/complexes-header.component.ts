import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { IComplexIndicator } from "@widgets/SUUTP/suutp-complexes/complexes.interface";
import { IKpeGaugeChartPage } from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

@Component({
    selector: 'evj-complexes-header',
    templateUrl: './complexes-header.component.html',
    styleUrls: ['./complexes-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexesHeaderComponent {
    @Input() title: string;
    @Input() indicators: IComplexIndicator[];
    @Input() chartPage: IKpeGaugeChartPage;

    public trackByIndex(index: number): number {
        return index;
    }
}
