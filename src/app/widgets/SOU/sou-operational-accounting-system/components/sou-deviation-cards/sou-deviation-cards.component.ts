import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISOUNotificationCards } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

type SouDeviationCardStatus = 'Новое';

@Component({
    selector: 'evj-sou-deviation-cards',
    templateUrl: './sou-deviation-cards.component.html',
    styleUrls: ['./sou-deviation-cards.component.scss'],
})
export class SouDeviationCardsComponent implements OnInit {
    @Input() data: ISOUNotificationCards[] = [];

    @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    public buttonClick(): void {
        this.closePanel.emit();
    }
}
