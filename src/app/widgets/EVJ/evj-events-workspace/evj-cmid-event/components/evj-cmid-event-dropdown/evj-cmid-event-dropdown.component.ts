import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CmidEventToogleValue} from "../evj-cmid-event-toggle/evj-cmid-event-toggle.component";

@Component({
    selector: 'evj-cmid-event-dropdown',
    templateUrl: './evj-cmid-event-dropdown.component.html',
    styleUrls: ['./evj-cmid-event-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjCmidEventDropdownComponent implements OnInit {
    @Input()
    public disabled: boolean = false;

    @Input()
    public items: string[] = [];

    constructor() {}

    ngOnInit(): void {}
}
