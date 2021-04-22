import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'evj-astue-onpz-factory-analysis-bar-multi-level-tooltip',
  templateUrl: './astue-onpz-factory-analysis-bar-multi-level-tooltip.component.html',
  styleUrls: ['./astue-onpz-factory-analysis-bar-multi-level-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent {
    public title: string;
    public value: number;
    public unit: string;
    public position: string;
}
