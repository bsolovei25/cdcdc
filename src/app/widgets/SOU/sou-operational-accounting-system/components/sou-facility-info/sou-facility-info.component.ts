import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISouFacilityInfo {
    title: string;
    counter: number;
}

@Component({
    selector: 'evj-sou-facility-info',
    templateUrl: './sou-facility-info.component.html',
    styleUrls: ['./sou-facility-info.component.scss']
})
export class SouFacilityInfoComponent implements OnInit {
    @Output() openPanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() data: ISouFacilityInfo = {
        title: 'АВТ-10-АБ',
        counter: 2,
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    counterClick(): void {
        this.openPanel.emit();
    }
}
