import { IEventsWidgetNotification } from '../../../../../models/EVJ/events-widget';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-user-events-item',
    templateUrl: './user-events-item.component.html',
    styleUrls: ['./user-events-item.component.scss'],
})
export class UserEventsItemComponent implements OnInit {
    @Input() cardData: IEventsWidgetNotification;
    @Input() icon2: 'smotr' | 'drops' = 'drops';
    @Input() eventStatus: 'default' | 'normal' | 'danger' = 'default';

    status(val: string): string {
        if (val === 'close') {
            return 'assets/icons/widgets/process/closed.svg';
        } else {
            return 'assets/icons/widgets/process/in-work.svg';
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
