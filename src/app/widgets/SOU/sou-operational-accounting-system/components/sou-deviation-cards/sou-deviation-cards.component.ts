import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-sou-deviation-cards',
    templateUrl: './sou-deviation-cards.component.html',
    styleUrls: ['./sou-deviation-cards.component.scss']
})
export class SouDeviationCardsComponent implements OnInit {
    @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.closePanel.emit();
    }

}
