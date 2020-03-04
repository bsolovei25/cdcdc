import { Component, Input } from '@angular/core';

@Component({
    selector: 'evj-ui-block',
    templateUrl: './ui-block.component.html',
    styleUrls: ['./ui-block.component.scss'],
})
export class UiBlockComponent {
    @Input() status: 'danger' | 'standart' | 'warning' | 'normal' | 'accept';
}
