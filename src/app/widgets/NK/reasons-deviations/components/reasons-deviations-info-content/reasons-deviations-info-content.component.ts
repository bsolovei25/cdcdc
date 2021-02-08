import { Component, OnInit, LOCALE_ID, Input } from '@angular/core';
import { IOilReasonsDeviations } from '../../reasons-deviations.component';

@Component({
    selector: 'evj-reasons-deviations-info-content',
    templateUrl: './reasons-deviations-info-content.component.html',
    styleUrls: ['./reasons-deviations-info-content.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
})
export class ReasonsDeviationsInfoContentComponent implements OnInit {
    @Input()
    public data: IOilReasonsDeviations | null = null;

    constructor() {}

    public ngOnInit(): void {}
}
