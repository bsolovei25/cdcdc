import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';
import { IFilterSetting } from '../components/filter-popup/filter-popup.component';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';

export interface IUdTableDict {
    key: string;
    title: string;
    type: string;
    filter?: {
        isSearch: boolean;
        isActive: boolean;
    };
}

@Component({
    selector: 'evj-petroleum-reference',
    templateUrl: './petroleum-reference.component.html',
    styleUrls: ['./petroleum-reference.component.scss'],
    animations: [
        trigger('leaveAnimation', [
            transition(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('200ms', style({ transform: 'translateY(60%)' })),
            ]),
        ]),
        trigger('enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(20%)' }),
                animate('200ms', style({ transform: 'translateY(0%)' })),
            ]),
        ]),
    ],
})
export class PetroleumReferenceComponent {
    @Input() typeScreen: string;
    @Input() data: any;
    @Input() updateParamBlock: boolean;

    @Output() exitBlock: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private petroleumService: PetroleumScreenService) {}

    public title: string[] = [
        'Источник',
        'Приемник',
        'Продукт по источнику',
        'Продукт по приемнику',
        'Начало операции',
        'Конец операции',
        'Масса операции по источнику',
        'Масса операции по приемнику',
        'Отклонение',
    ];

    public keys: string[] = [
        'sourceName',
        'destinationName',
        'sourceProduct',
        'destinationProduct',
        'startTime',
        'endTime',
        'sourceMass',
        'destinationMass',
        'deltaMass',
    ];

    public dictionary: IUdTableDict[] = [
        {
            key: 'sourceName',
            title: 'Источник',
            type: 'string',
            filter: {
                isSearch: true,
                isActive: false,
            },
        },
        {
            key: 'destinationName',
            title: 'Приемник',
            type: 'string',
            filter: {
                isSearch: true,
                isActive: false,
            },
        },
        {
            key: 'sourceProduct',
            title: 'Продукт по источнику',
            type: 'string',
            filter: {
                isSearch: true,
                isActive: false,
            },
        },
        {
            key: 'destinationProduct',
            title: 'Продукт по приемнику',
            type: 'string',
            filter: {
                isSearch: true,
                isActive: false,
            },
        },
        {
            key: 'startTime',
            title: 'Начало операции',
            type: 'date',
            filter: {
                isSearch: false,
                isActive: false,
            },
        },
        {
            key: 'endTime',
            title: 'Конец операции',
            type: 'date',
            filter: {
                isSearch: false,
                isActive: false,
            },
        },
        {
            key: 'sourceMass',
            title: 'Масса операции по источнику',
            type: 'number',
            filter: {
                isSearch: false,
                isActive: false,
            },
        },
        {
            key: 'destinationMass',
            title: 'Масса операции по приемнику',
            type: 'number',
            filter: {
                isSearch: false,
                isActive: false,
            },
        },
        {
            key: 'deltaMass',
            title: 'Отклонение',
            type: 'number',
            filter: {
                isSearch: false,
                isActive: false,
            },
        },
    ];
}
