import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    ISOUFlowOut,
    ISOUSection
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';


@Component({
    selector: 'evj-sou-out-streams',
    templateUrl: './sou-out-streams.component.html',
    styleUrls: ['./sou-out-streams.component.scss']
})
export class SouOutStreamsComponent implements OnInit {

    @Input() set flowOut(data: ISOUFlowOut[]) {
        if (data) {
            this.data = data;
            this.getValuePercent(this.data);
        }
    }

    @Input() sections: ISOUSection[] = [];
    @Output() changeSection: EventEmitter<ISOUSection> = new EventEmitter<ISOUSection>();

    data: ISOUFlowOut[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    onClickName(section: ISOUSection): void {
        this.changeSection.emit(section);
    }

    getValuePercent(data: ISOUFlowOut[]): void {
        let sumValueByHourPercent: number = 0;
        let sumValueTankPercent: number = 0;
        let sumValueMomentPercent: number = 0;

        data.forEach(item => {
            sumValueByHourPercent += item.valueByHour;
            sumValueTankPercent += item.valueTank;
            sumValueMomentPercent += item.valueMoment;
        });
        data.map(item => {
            item.valueMomentPercent = +(item.valueMoment / sumValueMomentPercent * 100).toFixed();
            item.valueByHourPercent = +(item.valueByHour / sumValueByHourPercent * 100).toFixed();
            item.valueTankPercent = +(item.valueTank / sumValueTankPercent * 100).toFixed();
        });
    }

}
