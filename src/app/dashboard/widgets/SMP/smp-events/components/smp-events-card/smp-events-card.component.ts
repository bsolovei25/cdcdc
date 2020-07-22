import { Component, OnInit, Input } from '@angular/core';
import { ISmpEventCard } from '../../../../../models/SMP/smp-events.model';

@Component({
    selector: 'evj-smp-events-card',
    templateUrl: './smp-events-card.component.html',
    styleUrls: ['./smp-events-card.component.scss'],
})
export class SmpEventsCardComponent implements OnInit {
    @Input() public isSelected: boolean = false;
    @Input() public event: ISmpEventCard = {
        id: 0,
        originalId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        itemNumber: 0,
        cardDate: '2020-07-10T10:04:18.642Z',
        statusName: 'statusName',
        productName: 'productName',
        severity: 'nonCritical',
        description: 'description',
        day: 0,
        responsibleOperator: {
            id: 0,
            login: 'login',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName',
            displayName: 'displayName',
        },
    };

    constructor() {}

    ngOnInit(): void {}
}
