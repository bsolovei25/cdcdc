import { Component, OnInit } from '@angular/core';
import { ISOUInStream } from '../sou-in-streams/sou-in-streams.component';

@Component({
    selector: 'evj-sou-out-streams',
    templateUrl: './sou-out-streams.component.html',
    styleUrls: ['./sou-out-streams.component.scss']
})
export class SouOutStreamsComponent implements OnInit {

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
            pims: 'FOIL',
            isActive: true
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
            pims: 'FOIL',
            isActive: true
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
            pims: 'FOIL',
            isActive: true
        }

    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
