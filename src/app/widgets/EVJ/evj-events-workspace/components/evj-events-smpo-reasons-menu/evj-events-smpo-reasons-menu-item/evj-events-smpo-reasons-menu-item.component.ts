import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

export interface IMenuItem {
    id: number;
    name: string;
    isSelected?: boolean;
}

@Component({
    selector: 'evj-events-smpo-reasons-menu-item',
    templateUrl: './evj-events-smpo-reasons-menu-item.component.html',
    styleUrls: ['./evj-events-smpo-reasons-menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvjEventsSmpoReasonsMenuItemComponent implements OnInit {
    @Input() menuItem: IMenuItem;

    constructor() {}

    ngOnInit(): void {}
}
