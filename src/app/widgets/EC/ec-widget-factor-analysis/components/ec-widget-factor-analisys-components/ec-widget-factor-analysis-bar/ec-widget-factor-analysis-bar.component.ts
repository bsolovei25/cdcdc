import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAstueOnpzFactoryAnalysisBar } from "@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model";

@Component({
    selector: 'evj-ec-widget-factor-analysis-bar',
    templateUrl: './ec-widget-factor-analysis-bar.component.html',
    styleUrls: ['./ec-widget-factor-analysis-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcWidgetFactorAnalysisBarComponent {
    @Input() set data(value: IAstueOnpzFactoryAnalysisBar) {
        this.barStyle = `top: ${100 - value.topLevel}%; bottom: ${value.lowLevel}%;`;
        this.barClass = value.type;
        this.value = value.value;
        this.title = value.title
    }
    public barStyle: string = null;
    public barClass: string = null;
    public value: number = null;
    public title: string = null;
}
