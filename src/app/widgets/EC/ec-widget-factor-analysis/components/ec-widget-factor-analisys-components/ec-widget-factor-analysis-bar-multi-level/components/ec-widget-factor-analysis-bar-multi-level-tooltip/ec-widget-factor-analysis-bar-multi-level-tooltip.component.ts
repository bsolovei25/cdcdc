import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'evj-ec-widget-factor-analysis-bar-multi-level-tooltip',
  templateUrl: './ec-widget-factor-analysis-bar-multi-level-tooltip.component.html',
  styleUrls: ['./ec-widget-factor-analysis-bar-multi-level-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetFactorAnalysisBarMultiLevelTooltipComponent {
    public title: string;
    public value: number;
    public unit: string;
    public position: string;
}
