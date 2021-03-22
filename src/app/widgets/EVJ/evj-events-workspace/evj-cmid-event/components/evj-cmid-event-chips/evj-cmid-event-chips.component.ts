import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CmidEventToogleValue} from "../evj-cmid-event-toggle/evj-cmid-event-toggle.component";

@Component({
    selector: 'evj-cmid-event-chips',
    templateUrl: './evj-cmid-event-chips.component.html',
    styleUrls: ['./evj-cmid-event-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventChipsComponent implements OnInit {
    @Input()
    public toggleValue: CmidEventToogleValue = 'non-plan';

    constructor() {}

    ngOnInit(): void {}
}
