import { Component, Input } from '@angular/core';

@Component({
    selector: 'evj-loading-shade',
    templateUrl: './loading-shade.component.html',
    styleUrls: ['./loading-shade.component.scss'],
})
export class LoadingShadeComponent {
    @Input() isLoading: boolean = false;
}
