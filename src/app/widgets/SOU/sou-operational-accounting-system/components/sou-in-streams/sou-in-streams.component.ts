import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

export interface ISOUInStream {
    name: string;
    firstValue: string;
    accept: string;
    instantaneousValue: ISOUValue;
    valueInAnHour: ISOUValue;
    accumulation: ISOUValue;
    sevenValue: string;
    trustLevel: string;
    pims: string;
    isActive: boolean;
}

interface ISOUValue {
    value: number;
    percent: string;
    engValue: string;
}

@Component({
    selector: 'evj-sou-in-streams',
    templateUrl: './sou-in-streams.component.html',
    styleUrls: ['./sou-in-streams.component.scss']
})
export class SouInStreamsComponent implements OnInit {

    valueMomentPercent: number = 0;
    valueByHourPercent: number = 0;
    valueTankPercent: number = 0;

    @Input() set flowIn(value: ISOUFlowIn[]) {
        if (value) {
            this.data = value;
            this.getPercentValue(value);
        }
    }

    data: ISOUFlowIn[] = [];
    //     {
    //         name: 'Установка №1',
    //         firstValue: 'знач',
    //         accept: 'знач',
    //         instantaneousValue: {
    //             value: 345,
    //             engValue: 'т/ч',
    //             percent: '85%'
    //         },
    //         valueInAnHour: {
    //             value: 1345,
    //             engValue: 'т',
    //             percent: '65%'
    //         },
    //         accumulation: {
    //             value: 4345,
    //             engValue: 'т',
    //             percent: '35%'
    //         },
    //         sevenValue: 'Нефть обес. и обезвож.',
    //         trustLevel: '100%',
    //         pims: 'FOIL',
    //         isActive: true
    //     },
    // ];

    constructor() {
    }

    ngOnInit(): void {
    }

    getPercentValue(data: ISOUFlowIn[]): void {
        let sumValueMomentPercent: number = 0;
        let sumValueByHourPercent: number = 0;
        let sumValueTankPercent: number = 0;
        this.data.forEach(item => {
            sumValueMomentPercent += item.valueMoment;
            sumValueByHourPercent += item.valueByHour;
            sumValueTankPercent += item.valueTank;
        });
        this.data.forEach(item => {
            this.valueMomentPercent = +(item.valueMoment / sumValueMomentPercent * 100).toFixed();
            this.valueByHourPercent = +(item.valueByHour / sumValueByHourPercent * 100).toFixed();
            this.valueTankPercent = +(item.valueTank / sumValueTankPercent * 100).toFixed();
        });


    }

}
