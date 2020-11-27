import { IParams } from '../../CD/cd-mat-balance/cd-mat-balance.component';

export const heatBalanceData: IParams[] = [
    {
        unit: {
            name: 'Сырьё',
            description: 'Сырьё'
        },
        unitParams: [
            {
                description: 'Загрузка печи по продукту',
                id: 0,
                deviation: 0,
                deviationState: 0,
                engUnits: 'Ед. изм',
                min: -224.9,
                max: 224.9,
                name: 'Загрузка печи по продукту',
                value: 150,
                modelValue: 200
            },
            {
                description: 'Температура продукта на входе в печь',
                id: 1,
                deviation: 0,
                deviationState: 0,
                engUnits: 'Ед. изм',
                min: -224.9,
                max: 224.9,
                name: 'Температура продукта на входе в печь',
                value: 120,
                modelValue: 200
            },
            {
                description: 'Температура продукта на входе в печь',
                id: 2,
                deviation: 0,
                deviationState: 0,
                engUnits: 'Ед. изм',
                min: -224.9,
                max: 224.9,
                name: 'Температура продукта на выходе из печи',
                value: 120,
                modelValue: 200
            },
            {
                description: 'Температура продукта на входе в печь',
                id: 3,
                deviation: 0,
                deviationState: 0,
                engUnits: 'Ед. изм',
                min: -224.9,
                max: 224.9,
                name: 'Доля отгона сырья',
                value: 120,
                modelValue: 200
            }
        ]
    },
    {
        unit: {
            name: 'Воздух',
            description: 'Воздух'
        },
        unitParams: [
            {
                description: 'Температура воздуха на горение в печи',
                id: 4,
                deviation: 75,
                deviationState: 0,
                engUnits: 'Ед. изм',
                min: -224.9,
                max: 224.9,
                name: 'Температура воздуха на горение в печи',
                value: 150,
                modelValue: 200
            },
            {
                description: 'Коэффициент избытка воздуха',
                id: 5,
                deviation: 160,
                deviationState: 0,
                engUnits: '',
                min: -224.9,
                max: 224.9,
                name: 'Коэффициент избытка воздуха',
                value: 120,
                modelValue: 200
            }
        ]
    }
];