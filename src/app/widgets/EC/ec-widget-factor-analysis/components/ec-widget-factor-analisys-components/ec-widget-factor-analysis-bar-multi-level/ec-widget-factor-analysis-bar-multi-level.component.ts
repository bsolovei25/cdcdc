import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EcWidgetFactorAnalysisBarComponent } from '../ec-widget-factor-analysis-bar/ec-widget-factor-analysis-bar.component';
import { IAstueOnpzFactoryAnalysisBar } from '@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { EcWidgetFactorAnalysisBarMultiLevelTooltipComponent } from './components/ec-widget-factor-analysis-bar-multi-level-tooltip/ec-widget-factor-analysis-bar-multi-level-tooltip.component';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';

@Component({
    selector: 'evj-ec-widget-factor-analysis-bar-multi-level',
    templateUrl: './ec-widget-factor-analysis-bar-multi-level.component.html',
    styleUrls: ['./ec-widget-factor-analysis-bar-multi-level.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcWidgetFactorAnalysisBarMultiLevelComponent extends EcWidgetFactorAnalysisBarComponent {
    public groups: EcWidgetFactorAnalysisBarComponent[] = [];
    @Input() totalValue: number = 0.0;

    private popoverRef: PopoverRef;

    constructor(private popoverOverlayService: PopoverOverlayService) {
        super();
    }

    @Input() set groupData(data: IAstueOnpzFactoryAnalysisBar) {
        const value = data.content;
        if (value.length) {
            value.forEach((group) => {
                const bar = new EcWidgetFactorAnalysisBarComponent();
                bar.data = group;
                this.groups.push(bar);
            });
        }
    }

    public trackByFn(value: number): number {
        return value;
    }

    public openTooltip(bar: EcWidgetFactorAnalysisBarComponent, event: Element): void {
        this.openPopover(event as HTMLElement, bar);
    }

    public closeTooltip(): void {
        if (this.popoverRef) {
            this.popoverRef.close();
        }
    }

    private openPopover(origin: HTMLElement, bar: EcWidgetFactorAnalysisBarComponent): void {
        const popoverRef = this.popoverOverlayService.open({
            content: EcWidgetFactorAnalysisBarMultiLevelTooltipComponent,
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
