import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-sou-facility-info',
    templateUrl: './sou-facility-info.component.html',
    styleUrls: ['./sou-facility-info.component.scss']
})
export class SouFacilityInfoComponent implements OnInit {
    @Output() openPanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() facilityTitle: string = 'АВТ-10-АБ';

    constructor() {
    }

    ngOnInit(): void {
    }

    counterClick(): void {
        this.openPanel.emit();
    }
}
