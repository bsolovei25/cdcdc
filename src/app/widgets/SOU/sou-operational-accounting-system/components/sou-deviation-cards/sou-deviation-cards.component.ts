import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type SouDeviationCardStatus = 'Новое';

export interface ISouDeviationCard {
    unit: string;
    info: string;
    status: SouDeviationCardStatus;
    timestamp: Date;
}

@Component({
    selector: 'evj-sou-deviation-cards',
    templateUrl: './sou-deviation-cards.component.html',
    styleUrls: ['./sou-deviation-cards.component.scss']
})
export class SouDeviationCardsComponent implements OnInit {

    @Input() data: ISouDeviationCard[] = [
        {
            unit: 'F118',
            info: 'Фр. ДТ "Летнее" ВСС',
            status: 'Новое',
            timestamp: new Date()
        },
        {
            unit: 'F119',
            info: 'Фр. ДТ "Летнее" ВСС',
            status: 'Новое',
            timestamp: new Date()
        }
    ];

    @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.closePanel.emit();
    }

}
