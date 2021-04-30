import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { variationColors } from './cmid-close-reason-variation-chart.enum';

@Component({
    selector: 'cmid-close-reason-variation-chart',
    templateUrl: './cmid-close-reason-variation-chart.component.html',
    styleUrls: ['./cmid-close-reason-variation-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidCloseReasonVariationChartComponent implements OnInit {
    @Input() public value: number;
    @Input() public isPositive: boolean;

    public backgroundColor: string;
    public valueColor: string;
    public strokeColor: string;

    ngOnInit(): void {
        this.getColors();
    }

    private getColors(): void {
        this.backgroundColor
        = this.strokeColor = this.isPositive
            ? variationColors.backgroundPositive
            : variationColors.backgroundNegative;
        this.valueColor = this.isPositive
            ? variationColors.valuePositive
            : variationColors.valueNegative;
    }
}
