import { Component, Input, OnInit } from '@angular/core';
import { ISouFlowIn } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

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
    styleUrls: ['./sou-in-streams.component.scss'],
})
export class SouInStreamsComponent implements OnInit {
    @Input() flowIn: ISouFlowIn[] = [];

    constructor() {}

    ngOnInit(): void {}
}
