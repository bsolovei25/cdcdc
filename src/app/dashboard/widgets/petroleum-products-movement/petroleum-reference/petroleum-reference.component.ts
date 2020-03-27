import { Component, Input, Output, EventEmitter } from '@angular/core';
import { transition, trigger, animate, style } from '@angular/animations';
import { ITransfer } from '../../../models/petroleum-products-movement.model';

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

    public data2: { name: string; type: string; value: number }[] = [
        {
            name: 'Продукт',
            type: 'кг/м3',
            value: 0.5,
        },
        {
            name: 'Продукт',
            type: 'кг/м3',
            value: 0.5,
        },
        {
            name: 'Продукт',
            type: 'кг/м3',
            value: 0.5,
        },
    ];
}
