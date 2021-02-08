import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISOUFlowOut, ISOUSection } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
    selector: 'evj-sou-out-streams',
    templateUrl: './sou-out-streams.component.html',
    styleUrls: ['./sou-out-streams.component.scss'],
})
export class SouOutStreamsComponent implements OnInit {
    @Input() flowOut: ISOUFlowOut[] = [];
    @Input() sections: ISOUSection;
    @Output() changeSection: EventEmitter<ISOUSection> = new EventEmitter<ISOUSection>();

    constructor() {}

    ngOnInit(): void {}

    onClickName(section: ISOUSection): void {
        this.changeSection.emit(section);
    }
}
