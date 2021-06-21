import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'evj-ec-tooltip',
    templateUrl: './ec-tooltip.component.html',
    styleUrls: ['./ec-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcTooltipComponent {
    public title: string;
    public value: number;
    public unit: string;
    public position: string;
}
