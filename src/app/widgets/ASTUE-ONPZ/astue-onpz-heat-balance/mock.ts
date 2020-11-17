import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';

export const heatBalanceData: IParams[] = [
    {
        unit: {
            name: 'Q общая ауцзшоацшзуаоуцзшоа',
            description: 'Q общая'
        },
        unitParams: [
            {
                description: 'Q1',
                id: 0,
                deviation: 0,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q1',
                value: 150,
                modelValue: 200
            },
            {
                description: 'Q2',
                id: 1,
                deviation: 0,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q2',
                value: 120,
                modelValue: 200
            },
            {
                description: 'Q3',
                id: 2,
                deviation: 0,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q3',
                value: 120,
                modelValue: 200
            },
            {
                description: 'Q4',
                id: 3,
                deviation: 0,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q4',
                value: 120,
                modelValue: 200
            }
        ]
    },
    {
        unit: {
            name: 'Q1 общая',
            description: 'Q1 общая'
        },
        unitParams: [
            {
                description: 'Q5',
                id: 4,
                deviation: 75,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q5',
                value: 150,
                modelValue: 200
            },
            {
                description: 'Q6',
                id: 5,
                deviation: 160,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q6',
                value: 120,
                modelValue: 200
            },
            {
                description: 'Q7',
                id: 6,
                deviation: 130,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Q7',
                value: 120,
                modelValue: 200
            }
        ]
    }
];
