import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISOUSection } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
    selector: 'evj-sou-facility-info',
    templateUrl: './sou-facility-info.component.html',
    styleUrls: ['./sou-facility-info.component.scss'],
})
export class SouFacilityInfoComponent implements OnInit {
    @Output() openPanel: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() data: ISOUSection;
    @Input() count: number = 0;

    constructor() {}

    ngOnInit(): void {}

    counterClick(): void {
        this.openPanel.emit();
    }
}
