import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAstueOnpzFactoryAnalysisBar } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-cell',
    templateUrl: './astue-onpz-factory-analysis-cell.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzFactoryAnalysisCellComponent {
    @Input() data: IAstueOnpzFactoryAnalysisBar = null;

    public isMultiple(data: IAstueOnpzFactoryAnalysisBar): boolean {
        return !!data?.content?.length;
    }
}
