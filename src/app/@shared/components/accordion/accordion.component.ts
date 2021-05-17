import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'evj-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent {
    @Input() title: string;
    @Input() isSingle: boolean;
}
