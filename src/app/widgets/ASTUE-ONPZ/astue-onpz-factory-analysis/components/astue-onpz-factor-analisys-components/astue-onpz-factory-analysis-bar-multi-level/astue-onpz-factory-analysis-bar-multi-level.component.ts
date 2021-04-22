import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AstueOnpzFactoryAnalysisBarComponent } from '../astue-onpz-factory-analysis-bar/astue-onpz-factory-analysis-bar.component';
import { IAstueOnpzFactoryAnalysisBar } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent } from './components/astue-onpz-factory-analysis-bar-multi-level-tooltip/astue-onpz-factory-analysis-bar-multi-level-tooltip.component';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-bar-multi-level',
    templateUrl: './astue-onpz-factory-analysis-bar-multi-level.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-bar-multi-level.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzFactoryAnalysisBarMultiLevelComponent extends AstueOnpzFactoryAnalysisBarComponent {
    public groups: AstueOnpzFactoryAnalysisBarComponent[] = [];
    @Input() totalValue: number = 0.0;

    private popoverRef: PopoverRef;

    constructor(private popoverOverlayService: PopoverOverlayService) {
        super();
    }

    @Input() set groupData(data: IAstueOnpzFactoryAnalysisBar) {
        const value = data.content;
        if (value.length) {
            value.forEach((group) => {
                const bar = new AstueOnpzFactoryAnalysisBarComponent();
                bar.data = group;
                this.groups.push(bar);
            });
        }
    }

    public trackByFn(value: number): number {
        return value;
    }

    public openTooltip(bar: AstueOnpzFactoryAnalysisBarComponent, event: Element): void {
        this.openPopover(event as HTMLElement, bar);
    }

    public closeTooltip(): void {
        if (this.popoverRef) {
            this.popoverRef.close();
        }
    }

    private openPopover(origin: HTMLElement, bar: AstueOnpzFactoryAnalysisBarComponent): void {
        const popoverRef = this.popoverOverlayService.open({
            content: AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent,
            origin,
            data: {
                title: 'bar.title',
                value: bar.value,
            },
        });

        popoverRef.afterClosed$.subscribe((res) => {
            console.log(res);
        });
    }
}
