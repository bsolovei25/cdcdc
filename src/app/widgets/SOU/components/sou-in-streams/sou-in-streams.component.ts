import { Component, OnInit } from '@angular/core';

interface ISOUInStream {
    name: string;
    firstValue: string;
    accept: string;
    instantaneousValue: ISOUValue;
    valueInAnHour: ISOUValue;
    accumulation: ISOUValue;
    sevenValue: string;
    trustLevel: string;
    pims: string;
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

    data: ISOUInStream[] = [
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
            sevenValue: 'Нефть обес. и обезвож.',
            trustLevel: '100%',
            pims: 'FOIL'
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
            sevenValue: 'Нефть обес. и обезвож.',
            trustLevel: '100%',
            pims: 'FOIL'
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
            sevenValue: 'Нефть обес. и обезвож.',
            trustLevel: '100%',
            pims: 'FOIL'
        }

    ];

    btnToggle: { id: number, isActive: boolean }[] = [
        { id: 1, isActive: true },
        { id: 2, isActive: true },
        { id: 3, isActive: true }
    ];
    btnOne: boolean = true;
    btnTwo: boolean = true;
    btnThree: boolean = true;

    constructor() {
    }

    ngOnInit(): void {
    }

}
