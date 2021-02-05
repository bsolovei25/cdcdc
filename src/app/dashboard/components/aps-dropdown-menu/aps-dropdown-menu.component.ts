import { Component, Input, ViewChild } from '@angular/core';

export interface INavItem {
    name: string;
    value?: number;
    onClick?(): void;
    children?: INavItem[];
}

@Component({
    selector: 'evj-aps-dropdown-menu',
    templateUrl: './aps-dropdown-menu.component.html',
    styleUrls: ['./aps-dropdown-menu.component.scss'],
})
export class ApsDropdownMenuComponent {
    @Input('items')
    public items: INavItem[];

    @ViewChild('dropdownMenu', { static: true })
    public dropdownMenu: any;
}
