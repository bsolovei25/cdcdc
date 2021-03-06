import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISouFlowOut, ISOUSection } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-out-streams',
    templateUrl: './sou-out-streams.component.html',
    styleUrls: ['./sou-out-streams.component.scss'],
})
export class SouOutStreamsComponent implements OnInit {
    @Input() flowOut: ISouFlowOut[] = [];
    @Input() sections: ISOUSection;
    @Output() changeSection: EventEmitter<ISOUSection> = new EventEmitter<ISOUSection>();

    constructor() {}

    ngOnInit(): void {}

    onClickName(section: ISOUSection): void {
        this.changeSection.emit(section);
    }
}
