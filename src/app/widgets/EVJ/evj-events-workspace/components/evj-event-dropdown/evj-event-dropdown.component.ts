import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'evj-event-dropdown',
    templateUrl: './evj-event-dropdown.component.html',
    styleUrls: ['./evj-event-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjEventDropdownComponent implements OnInit {
    @Input()
    public disabled: boolean = false;

    @Input()
    public items: string[] = [];

    constructor() {}

    ngOnInit(): void {}
}
