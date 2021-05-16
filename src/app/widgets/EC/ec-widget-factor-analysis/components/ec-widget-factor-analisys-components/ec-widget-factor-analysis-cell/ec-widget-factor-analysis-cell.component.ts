import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAstueOnpzFactoryAnalysisBar } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

@Component({
    selector: 'evj-ec-widget-factor-analysis-cell',
    templateUrl: './ec-widget-factor-analysis-cell.component.html',
    styleUrls: ['./ec-widget-factor-analysis-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcWidgetFactorAnalysisCellComponent {
    @Input() data: IAstueOnpzFactoryAnalysisBar = null;

    public isMultiple(data: IAstueOnpzFactoryAnalysisBar): boolean {
        return !!data?.content?.length;
    }
}
