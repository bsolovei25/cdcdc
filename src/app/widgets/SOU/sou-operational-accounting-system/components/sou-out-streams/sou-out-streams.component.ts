import { Component, OnInit } from '@angular/core';
import { ISOUInStream } from '../sou-in-streams/sou-in-streams.component';

interface ISOUOutStream {
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
    deviation: boolean;
    valueEnd: string[];
}

interface ISOUValue {
    value: number;
    percent: string;
    engValue: string;
}

@Component({
    selector: 'evj-sou-out-streams',
    templateUrl: './sou-out-streams.component.html',
    styleUrls: ['./sou-out-streams.component.scss']
})
export class SouOutStreamsComponent implements OnInit {

    data: ISOUOutStream[] = [
        {
            name: 'Установка №1',
            firstValue: 'знач',
            accept: 'знач',
            instantaneousValue: {
                value: 345,
                engValue: 'т/ч',
                percent: '85%'
            },
            valueInAnHour: {
                value: 1345,
                engValue: 'т',
                percent: '65%'
            },
            accumulation: {
                value: 4345,
                engValue: 'т',
                percent: '35%'
            },
            sevenValue: 'Газ сухой',
            trustLevel: '100%',
            pims: 'FOIL',
            isActive: true,
            deviation: false,
            valueEnd: ['Установка', 'Товарное производство', 'Бензин К-6 в ТП']
        },
        {
            name: 'Установка №2',
            firstValue: 'знач',
            accept: 'знач',
            instantaneousValue: {
                value: 345,
                engValue: 'т/ч',
                percent: '85%'
            },
            valueInAnHour: {
                value: 1345,
                engValue: 'т',
                percent: '65%'
            },
            accumulation: {
                value: 4345,
                engValue: 'т',
                percent: '35%'
            },
            sevenValue: 'Газ сухой',
            trustLevel: '100%',
            pims: 'FOIL',
            isActive: true,
            deviation: true,
            valueEnd: ['Установка']
        },
        {
            name: 'Установка №3',
            firstValue: 'знач',
            accept: 'знач',
            instantaneousValue: {
                value: 345,
                engValue: 'т/ч',
                percent: '85%'
            },
            valueInAnHour: {
                value: 1345,
                engValue: 'т',
                percent: '65%'
            },
            accumulation: {
                value: 4345,
                engValue: 'т',
                percent: '35%'
            },
            sevenValue: 'Газ сухой',
            trustLevel: '100%',
            pims: 'FOIL',
            isActive: true,
            deviation: false,
            valueEnd: ['Установка', 'Товарное производство']
        }

    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
